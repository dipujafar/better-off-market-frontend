"use client";
import { tagTypes } from "@/redux/tagTypes";
import { onMessage } from "firebase/messaging";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import CustomToast from "@/components/shared/CustomToast";
import notificationApi from "@/redux/api/notificationApi";
import { getFcmMessaging } from "@/lib/firebase/messaging-client";

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let disposed = false;
    let unsubscribe = () => {};

    const setupMessaging = async () => {
      const messaging = await getFcmMessaging();
      if (!messaging || disposed) return;

      unsubscribe = onMessage(messaging, (payload) => {
        dispatch(
          notificationApi.util.invalidateTags([tagTypes.notifications]),
        );

        const title = payload.notification?.title ?? payload.data?.title;
        const body = payload.notification?.body ?? payload.data?.body;
        if (!title && !body) return;

        toast.custom(
          () => <CustomToast title={title} body={body} />,
          { position: "bottom-left" },
        );
      });
    };

    void setupMessaging().catch((error) => {
      console.error("Unable to initialize Firebase messaging:", error);
    });

    return () => {
      disposed = true;
      unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default FirebaseProvider;
