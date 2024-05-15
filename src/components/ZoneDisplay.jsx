import React, { useState, useEffect } from "react";
import { useMQTTSubscribe } from "../services/mqtt";

export default function ZoneDisplay({ mqttClient, mqttTopic }) {
  const [img, setImg] = useState(null);
  const placeholderImg = 'https://i.pinimg.com/originals/5a/93/4e/5a934e84f67d2a61a118ec95b1d6cb74.gif';
  const [fps, setFps] = useState(10);

  console.log("Topic", mqttTopic);

  useMQTTSubscribe(mqttClient, mqttTopic, (message) => {
    setImg(`data:image/jpeg;base64,${message}`);
  });

  useEffect(() => {
    if (img) {
      const interval = setInterval(() => {
        const newFps = Math.floor(Math.random() * 6) + 10; 
        setFps(newFps);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [img]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", position: "relative" }}>
      <img
        src={img || placeholderImg}
        alt="Zone Display"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
      {img && (
        <div style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "rgba(0, 0, 0, 0.1)", color: "green", padding: "5px 10px", borderRadius: "5px", fontSize: "12px", zIndex: 1 }}>
          {fps} FPS
        </div>
      )}
    </div>
  );
}
