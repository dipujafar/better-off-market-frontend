// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyDLf0Wzys9fFvnoJ8xLYUxanbtSrWcHmXM",
  authDomain: "betteroffmarket-4e241.firebaseapp.com",
  projectId: "betteroffmarket-4e241",
  storageBucket: "betteroffmarket-4e241.firebasestorage.app",
  messagingSenderId: "670954792583",
  appId: "1:670954792583:web:4b48763c8b8eaea461fa22",
  measurementId: "G-DB8WLZZ7FR"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo_blue.png",
    badge: "/logo_blue.png",
    data: {
      url: payload.data?.url || "/notifications", 
    },
    vibrate: [100, 50, 100],
    sound: "default",
    tag: "notification",
    renotify: true,
    requireInteraction: true,
    silent: false,
    actions: [
      { action: "open", title: "Open" },
      { action: "close", title: "Close" },
    ],
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 👇 Add this — handles the click on the notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/notifications";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // If app tab is already open, focus it and navigate
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.focus();
            return client.navigate(targetUrl);
          }
        }
        // Otherwise open a new tab
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});