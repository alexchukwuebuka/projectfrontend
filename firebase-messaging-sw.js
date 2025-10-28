/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD9teemP8KjUjdtBfuGOMVJmwDYyxspwCI",
  authDomain: "esp32cam-monitor-d74d9.firebaseapp.com",
  projectId: "esp32cam-monitor-d74d9",
  storageBucket: "esp32cam-monitor-d74d9.firebasestorage.app",
  messagingSenderId: "858306677613",
  appId: "1:858306677613:web:172a23932659c4fa822864",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📨 Received background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/camera-icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
