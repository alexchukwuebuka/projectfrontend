// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD9teemP8KjUjdtBfuGOMVJmwDYyxspwCI",
  authDomain: "esp32cam-monitor-d74d9.firebaseapp.com",
  projectId: "esp32cam-monitor-d74d9",
  storageBucket: "esp32cam-monitor-d74d9.firebasestorage.app",
  messagingSenderId: "858306677613",
  appId: "1:858306677613:web:172a23932659c4fa822864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// 🔑 Request permission & get FCM token
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY, // set this in .env later
    });

    if (currentToken) {
      console.log("✅ FCM Token:", currentToken);
      return currentToken;
    } else {
      console.warn("🚫 No registration token available.");
      return null;
    }
  } catch (err) {
    console.error("❌ An error occurred while retrieving token:", err);
    return null;
  }
};

// 📨 Listen for messages while app is open
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📩 Foreground message received:", payload);
      resolve(payload);
    });
  });
