// src/components/MqttClient.jsx
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function MqttClient({ onMotion, onStreamIp }) {
  useEffect(() => {
    // Connect to your backend WebSocket
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to backend WebSocket server:", socket.id);
    });

    // Listen for real-time updates emitted from backend
    socket.on("stream_update", (data) => {
      console.log("🎥 Stream Update:", data);
      onStreamIp?.(data.ip);
    });

    socket.on("motion_detected", (data) => {
      console.log("🚨 Motion Detected:", data);
      onMotion?.(data.message || "Motion detected!");
    });

    socket.on("disconnect", () => {
      console.warn("❌ Disconnected from WebSocket server");
    });

    // Cleanup connection on unmount
    return () => socket.disconnect();
  }, [onMotion, onStreamIp]);

  return null;
}
