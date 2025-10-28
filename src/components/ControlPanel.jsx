// src/components/ControlPanel.jsx
import { useState } from "react";
import { sendTimeControl } from "../api/api";

export default function ControlPanel() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [payloadSent, setPayloadSent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setPayloadSent("");

    try {
      const payload = { startTime, endTime };
      const res = await sendTimeControl(payload);

      if (res.status === 200) {
        setMessage("✅ Control command sent successfully!");
        setPayloadSent(res.data.payload); // Display actual payload sent
      } else {
        setMessage("⚠️ Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error sending time control:", err);
      setMessage("❌ Failed to send control command.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-4">⏱️ Time Control Panel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send Control Command"}
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
        {payloadSent && (
          <p className="text-center text-sm mt-1 text-gray-600">
            Payload sent: <code>{payloadSent}</code>
          </p>
        )}
      </form>
    </div>
  );
}
