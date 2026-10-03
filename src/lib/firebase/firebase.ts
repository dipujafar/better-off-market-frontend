// src/firebase/firebase.ts
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDLf0Wzys9fFvnoJ8xLYUxanbtSrWcHmXM",
  authDomain: "betteroffmarket-4e241.firebaseapp.com",
  projectId: "betteroffmarket-4e241",
  storageBucket: "betteroffmarket-4e241.firebasestorage.app",
  messagingSenderId: "670954792583",
  appId: "1:670954792583:web:4b48763c8b8eaea461fa22",
  measurementId: "G-DB8WLZZ7FR"
};

export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);