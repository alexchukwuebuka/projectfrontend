// src/components/LiveStream.jsx
import { useEffect } from "react";

export default function LiveStream({ streamIp }) {
  useEffect(() => {
    if (!streamIp) return;

    const interval = setInterval(() => {
      const img = document.getElementById("esp32-live-stream");
      if (img) img.src = `http://${streamIp}:81/stream?t=${Date.now()}`;
    }, 500); // refresh frame every 500ms to keep stream alive

    return () => clearInterval(interval);
  }, [streamIp]);

  if (!streamIp) {
    return <p className="text-gray-500 text-center">Waiting for stream...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Live Camera Stream</h2>
      <div className="flex justify-center">
        {/* <img
          id="esp32-live-stream"
          src={`http://${streamIp}:81/stream?t=${Date.now()}`}
          alt="ESP32 Live Stream"
          className="rounded-lg shadow-lg border w-full max-w-lg"
          width="640"
          height="480"
        /> */}
      </div>
    </div>
  );
}
