"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import { useSelector } from "react-redux";
import { MessageCirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSocket } from "@/context/SocketContextApi";
import { selectUser } from "@/redux/features/authSlice";
import ConversationSidebar from "./ConversationSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

import type {
  ChatContact,
  ChatListItem,
  ChatMessage,
  Conversation,
  SelectedUser,
} from "./types";
import { initialsFromName } from "./Chatfileutils";
import { toast } from "sonner";
import { useGetUserByIdQuery } from "@/redux/api/profileApi";
import { useFileUploadMutation } from "@/redux/api/uploadApi";

/** Normalize a raw server message into a consistent shape */
function normalizeMessage(raw: any): ChatMessage {
  return {
    _id: raw._id,
    sender: raw.sender,
    text: raw.text ?? "",
    imageUrl: raw.imageUrl,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    seen: raw.seen,
    chat: raw.chat,
    receiver: raw.receiver,
  };
}

function toConversation(item: ChatListItem, userId?: string): Conversation {
  const other = item.chat.participants[0];
  const unread =
    !item.message?.seen &&
    item.message?.sender !== userId &&
    Boolean(item.message);

  return {
    id: item.chat._id,
    name: other?.name ?? "Unknown",
    initials: initialsFromName(other?.name),
    online: false, // filled in against activeUsers where this is used
    timestamp: item.message?.createdAt
      ? formatDistanceToNowStrict(new Date(item.message.createdAt), {
          addSuffix: true,
        })
      : "",
    lastMessage:
      item.message?.text ||
      (item.message?.imageUrl?.length ? "Sent an attachment" : ""),
    unread,
    profile: other?.profile,
  };
}

export default function MessagesContainer() {
  const { socket } = useSocket();
  const userId = useSelector(selectUser)?.userId;
  const [fileUploadFn] = useFileUploadMutation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [chatListLoading, setChatListLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [isMsgSendLoading, setIsMsgSendLoading] = useState(false);

  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [chatId, setChatId] = useState<string>("");
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isReceiverTyping, setIsReceiverTyping] = useState(false);

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSendsRef = useRef<string[]>([]);

  // ── Selected user: local state, seeded from the URL ─────────────────────
  // Seeding from searchParams on first render is what makes selection
  // survive a reload. From then on, clicks update THIS state directly and
  // synchronously — the UI never waits on a router round-trip, so it can't
  // go dead if a push happens to not re-trigger useSearchParams() (which is
  // what was happening: the URL may have been changing, but nothing forced
  // a re-render off it after a full page load).
  const [selectedUserId, setSelectedUserIdState] = useState<string | null>(
    () => searchParams.get("user"),
  );

  // Still listen for the URL changing from OUTSIDE our own clicks — the
  // browser's native back/forward buttons — and keep local state in sync.
  // Harmless no-op when it's just echoing a change we already made locally.
  useEffect(() => {
    setSelectedUserIdState(searchParams.get("user"));
  }, [searchParams]);

  const setSelectedUserId = useCallback(
    (id: string | null) => {
      // Update local state immediately — this is what actually drives the UI.
      setSelectedUserIdState(id);

      // Keep the URL in sync as a side effect, so reload/sharing still work.
      const params = new URLSearchParams(searchParams.toString());
      if (id) {
        params.set("user", id);
      } else {
        params.delete("user");
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  // Prefer the participant data we already have from the chat list (it also
  // carries chatId). Only hit the network for a user we don't have yet —
  // e.g. starting a brand-new conversation from a profile link.
  const chatListMatch = useMemo(() => {
    if (!selectedUserId) return null;
    const item = chatList.find(
      (c) => c.chat.participants[0]?._id === selectedUserId,
    );
    if (!item) return null;
    const other = item.chat.participants[0];
    return { ...other, chatId: item.chat._id } as SelectedUser;
  }, [chatList, selectedUserId]);

  const { data: userRes, isLoading: isUserLoading } = useGetUserByIdQuery(
    selectedUserId,
    { skip: !selectedUserId || Boolean(chatListMatch) },
  );

  const selectedUser: SelectedUser | null = chatListMatch
    ? chatListMatch
    : selectedUserId && userRes?.data
      ? (userRes.data as SelectedUser)
      : null;

  // ── Chat list ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!socket || !userId) return;

    const fetchChatList = () => {
      setChatListLoading(true);
      socket.emit("my_chat_list", { page: 1, limit: 9999 });
    };

    const handleChatList = (res: { chats?: ChatListItem[] }) => {
      setChatList(res?.chats ?? []);
      setChatListLoading(false);
    };

    socket.on("chat_list", handleChatList);
    if (socket.connected) fetchChatList();
    socket.on("connect", fetchChatList);

    return () => {
      socket.off("chat_list", handleChatList);
      socket.off("connect", fetchChatList);
    };
  }, [socket, userId]);

  // ── Online users ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!socket || !userId) return;
    const handleOnlineUsers = (res: string[]) => setActiveUsers(res);
    socket.on("onlineUser", handleOnlineUsers);
    return () => {
      socket.off("onlineUser", handleOnlineUsers);
    };
  }, [socket, userId]);

  // ── Messages for the active conversation ──────────────────────────────
  useEffect(() => {
    if (!socket || !userId || !selectedUser?._id) return;

    const fetchMessages = () => {
      setMessagesLoading(true);
      socket.emit("message_page", {
        userId: selectedUser._id,
        page: 1,
        limit: 9999,
      });
    };

    const handleMessages = (res: any) => {
      let raw: any[] = [];
      const outer = res?.data;
      if (Array.isArray(outer)) {
        raw = outer;
      } else if (
        outer &&
        typeof outer === "object" &&
        Array.isArray(outer.data)
      ) {
        raw = outer.data;
      }
      setMessages(raw.map(normalizeMessage));
      setMessagesLoading(false);
      if (selectedUser?.chatId)
        socket.emit("seen", { chatId: selectedUser.chatId });
    };

    socket.on("message", handleMessages);
    if (socket.connected) fetchMessages();
    socket.on("connect", fetchMessages);

    return () => {
      socket.off("message", handleMessages);
      socket.off("connect", fetchMessages);
    };
  }, [socket, userId, selectedUser?._id]);

  // ── Set chatId when selectedUser changes ───────────────────────────────
  useEffect(() => {
    setChatId(selectedUser?.chatId ?? "");
  }, [selectedUser?.chatId]);

  // ── Real-time new message ───────────────────────────────────────────────
  useEffect(() => {
    if (!socket || !chatId) return;
    const event = `new-message::${chatId}`;

    const handleNewMessage = (res: any) => {
      const normalized = normalizeMessage(res);

      setMessages((prev) => {
        // Our own message echoing back — resolve the oldest pending optimistic entry
        if (
          normalized.sender === userId &&
          pendingSendsRef.current.length > 0
        ) {
          const tempId = pendingSendsRef.current.shift()!;
          return prev.map((m) => (m._id === tempId ? normalized : m));
        }
        // Message from the other participant — append if we don't already have it
        const exists = prev.some((m) => m._id === normalized._id);
        return exists ? prev : [...prev, normalized];
      });

      setIsMsgSendLoading(false);
      socket.emit("seen", { chatId });
    };

    socket.on(event, handleNewMessage);
    return () => {
      socket.off(event, handleNewMessage);
    };
  }, [socket, chatId, userId]);

  // ── Typing indicator ────────────────────────────────────────────────────
  useEffect(() => {
    if (!socket || !chatId) return;

    const handleTyping = (res: { userId: string; isTyping: boolean }) => {
      if (res.userId !== userId) {
        setIsReceiverTyping(res.isTyping);
        if (res.isTyping) {
          if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(
            () => setIsReceiverTyping(false),
            4000,
          );
        }
      }
    };

    socket.on(`typing::${chatId}`, handleTyping);
    return () => {
      socket.off(`typing::${chatId}`, handleTyping);
    };
  }, [socket, chatId, userId]);

  // ── Mark seen when chatId changes ──────────────────────────────────────
  useEffect(() => {
    if (socket && userId && chatId) socket.emit("seen", { chatId });
  }, [chatId, socket, userId]);

  const handleTyping = useCallback(() => {
    if (!socket || !chatId) return;
    socket.emit("typing", { chatId, isTyping: true });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", { chatId, isTyping: false });
    }, 2000);
  }, [socket, chatId]);

  // ── Send message ─────────────────────────────────────────────────────
  const handleSend = async (content: string, files?: File[]) => {
    if (!socket || !userId || !selectedUser?._id) return;
    setIsMsgSendLoading(true);

    const payload: { text: string; imageUrl: string[]; receiver: string } = {
      text: content,
      imageUrl: [],
      receiver: selectedUser._id,
    };

    try {
      if (files?.length) {
        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));
        const res = await fileUploadFn(formData).unwrap();
        payload.imageUrl =
          res?.data?.map((img: { url: string }) => img.url) ?? [];
      }

      const tempId = `tmp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const optimistic: ChatMessage = {
        _id: tempId,
        sender: userId,
        text: payload.text,
        imageUrl: payload.imageUrl,
        createdAt: new Date().toISOString(),
        _isPending: true,
        _status: "sending",
      };

      pendingSendsRef.current.push(tempId);
      setMessages((prev) => [...prev, optimistic]);

      socket.emit("send_message", {
        receiver: selectedUser._id,
        text: payload.text,
        imageUrl: payload.imageUrl,
      });

      setIsMsgSendLoading(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
      setIsMsgSendLoading(false);
    }
  };

  // ── Derived view data ───────────────────────────────────────────────────
  const conversations: Conversation[] = useMemo(
    () =>
      chatList.map((item) => {
        const base = toConversation(item, userId);
        const other = item.chat.participants[0];
        return {
          ...base,
          online: other ? activeUsers.includes(other._id) : false,
        };
      }),
    [chatList, activeUsers, userId],
  );

  const activeContact: ChatContact | null = selectedUser
    ? {
        _id: selectedUser._id,
        name: selectedUser.name,
        initials: initialsFromName(selectedUser.name),
        profile: selectedUser.profile,
        online: activeUsers.includes(selectedUser._id),
      }
    : null;

  // Selecting a conversation just updates the URL — the derived
  // `selectedUser` above picks it up from there.
  const handleSelectConversation = (id: string) => {
    const item = chatList.find((c) => c.chat._id === id);
    const other = item?.chat.participants[0];
    if (other) {
      setSelectedUserId(other._id);
    }
  };

  const handleBack = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl overflow-hidden">
      <ConversationSidebar
        conversations={conversations}
        activeId={chatId || null}
        onSelect={handleSelectConversation}
        loading={chatListLoading}
        className={cn(
          "w-full md:w-75 lg:w-85 border-r border-primary-border-color shrink-0",
          selectedUserId && "hidden md:flex",
        )}
      />

      <div
        className={cn(
          "flex-1 min-w-0 flex-col",
          selectedUserId ? "flex" : "hidden md:flex",
        )}
      >
        {activeContact ? (
          <>
            <ChatHeader contact={activeContact} onBack={handleBack} />
            <ChatMessages
              messages={messages}
              userId={userId}
              selectedUser={selectedUser as SelectedUser}
              loading={messagesLoading}
              isReceiverTyping={isReceiverTyping}
            />
            <MessageInput
              onSend={handleSend}
              onTyping={handleTyping}
              disabled={isMsgSendLoading}
            />
          </>
        ) : selectedUserId && isUserLoading ? (
          <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
            Loading conversation...
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-sm text-slate-400">
            <MessageCirclePlus className="size-6" />
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}