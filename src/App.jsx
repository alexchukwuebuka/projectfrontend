import { useState, useEffect } from "react";
import MqttClient from "./components/MqttClient";
import LiveStream from "./components/LiveStream";
import ImageGallery from "./components/ImageGallery";
import ControlPanel from "./components/ControlPanel";

import { requestForToken, onMessageListener } from "./firebase";
import axios from "axios";

export default function App() {
  const [motionTriggerCount, setMotionTriggerCount] = useState(0);
  const [streamIp, setStreamIp] = useState("");
  const [refreshGallery, setRefreshGallery] = useState(0);

  useEffect(() => {
    // Browser notification permission
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") console.log("✅ Notification permission granted");
        else console.warn("🚫 Notifications disabled by user");
      });
    }
  }, []);

  // FCM integration
  useEffect(() => {
    requestForToken().then((token) => {
      if (token) {
        console.log("💾 Sending FCM token to backend...");
        axios.post(`${import.meta.env.VITE_API_BASE}/api/motion/motion-detected`, {
          fcmToken: token,
          imageUrl: null,
        });
      }
    });

    onMessageListener().then((payload) => {
      console.log("📳 FCM foreground notification received:", payload);
      if (Notification.permission === "granted") {
        const { title, body } = payload.notification || {};
        new Notification(title, {
          body,
          icon: "/camera-icon.png",
        });
      }
    });
  }, []);

  // ✅ Updated motion handler
  const handleMotion = (msg) => {
    console.log("📩 Motion event received:", msg);

    // Only trigger refresh if message is explicitly "motion detected"
    if (msg.toLowerCase() === "motion detected") {
      setMotionTriggerCount((prev) => prev + 1);

      // Optional: trigger a browser notification
      if (Notification.permission === "granted") {
        const notification = new Notification("📸 Motion Detected!", {
          body: "Tap to view the captured image.",
          icon: "/camera-icon.png",
        });
        notification.onclick = () => {
          window.focus();
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      }
    }
  };

  const handleStreamIp = (ip) => setStreamIp(ip);
  const handleCaptureRefresh = () => setRefreshGallery((prev) => prev + 1);

  return (
    <div className="max-w-4xl mx-auto py-6">
      <MqttClient onMotion={handleMotion} onStreamIp={handleStreamIp} />
      <h1 className="text-2xl font-bold text-center mb-6">ESP32-CAM Dashboard</h1>

      <LiveStream streamIp={streamIp} />
      <ImageGallery motionTriggerCount={motionTriggerCount + refreshGallery} />
      <ControlPanel onCapture={handleCaptureRefresh} />
    </div>
  );
}
