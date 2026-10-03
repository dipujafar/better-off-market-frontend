"use client";

import { getToken } from "firebase/messaging";
import { envConfig } from "@/config";
import { getFcmMessaging } from "@/lib/firebase/messaging-client";
import { useState } from "react";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  const requestFcmToken = async () => {
    try {
      if (
        typeof window === "undefined" ||
        !("serviceWorker" in navigator) ||
        !("Notification" in window)
      ) {
        return null;
      }

      const permission =
        Notification.permission === "default"
          ? await Notification.requestPermission()
          : Notification.permission;
      setNotificationPermissionStatus(permission);

      if (permission !== "granted") return null;
      if (!envConfig.firebaseVapidKey) {
        console.error("NEXT_PUBLIC_FIREBASE_VAPID_KEY is not configured.");
        return null;
      }

      const [messaging, registration] = await Promise.all([
        getFcmMessaging(),
        navigator.serviceWorker.register("/firebase-messaging-sw.js"),
      ]);
      if (!messaging) return null;

      const currentToken = await getToken(messaging, {
        vapidKey: envConfig.firebaseVapidKey,
        serviceWorkerRegistration: registration,
      });
      setToken(currentToken);
      return currentToken || null;
    } catch (error) {
      console.error("Unable to retrieve Firebase messaging token:", error);
      return null;
    }
  };

  return {
    fcmToken: token,
    notificationPermissionStatus,
    requestFcmToken,
  };
};

export default useFcmToken;