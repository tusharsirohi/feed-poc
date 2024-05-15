// Sidebar.js

import React, { useEffect, useRef } from "react";
import "./Sidebar.css"; // Importing CSS file for sidebar styles
import IncidentItem from "./IncidentItem";
import { useMQTTSubscribe } from "../../services/mqtt";

const Sidebar = ({ mqttClient, zoneTopic }) => {
  const [incidents, setIncidents] = React.useState([]);
  const scrollRef = useRef(null);

  useMQTTSubscribe(mqttClient, "violation", (message) => {
    let violation;
    try {
      violation = JSON.parse(message);
    } catch (e) {
      console.error("Failed to parse message:", message, e);
      return;
    }

    // console.log("Received violation:", violation);

    if (!zoneTopic || violation.location === zoneTopic) {
      setIncidents((prevIncidents) => [
        ...prevIncidents,
        {
          location: violation.location,
          title: violation.title,
          img: `data:image/jpeg;base64,${violation.thumbnail}`,
          time: new Date(violation.ts).toLocaleTimeString(),
        },
      ]);
      // console.log("Incident added for topic:", violation.topic);
    } else {
      console.log(`Filtered out violation for topic: ${violation.topic}`);
    }
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [incidents]);

  return (
    <div className="sidebar">
      <div className="main-title">ALERT NOTIFICATIONS</div>
      <div className="sidebar-content" ref={scrollRef}>
        {incidents.map((incident, index) => (
          <IncidentItem
            key={index}
            location={incident.location}
            time={incident.time}
            title={incident.title}
            desc={incident.description}
            img={incident.img}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;