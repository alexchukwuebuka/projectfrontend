import { useEffect, useState } from "react";

export default function ImageGallery({ motionTriggerCount }) {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await fetch("https://media-uploader-6fb9.onrender.com/api/upload/image");
      const data = await res.json();

      // ✅ Sort by latest first (descending order)
      const sortedImages = (data.images || []).sort((a, b) => {
        // if the backend provides timestamps, use them
        const dateA = new Date(a.createdAt || a.timestamp || 0);
        const dateB = new Date(b.createdAt || b.timestamp || 0);
        return dateB - dateA;
      });

      setImages(sortedImages);
      console.log("🖼️ Image gallery refreshed:", sortedImages.length, "images");
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchImages();
  }, []);

  // Re-fetch when motion is detected
  useEffect(() => {
    if (motionTriggerCount > 0) {
      fetchImages();
    }
  }, [motionTriggerCount]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Captured Images</h2>
      {images.length === 0 ? (
        <p className="text-gray-500 text-center">No images captured yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((url, i) => (
            <img
              key={i}
              src={url.url}
              alt={`Snapshot ${i}`}
              className="rounded-md shadow-md hover:scale-105 transition-transform duration-200"
            />
          ))}
        </div>
      )}
    </div>
  );
}
