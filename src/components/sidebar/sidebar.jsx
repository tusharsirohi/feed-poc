// Sidebar.js

import React from "react";
import "./Sidebar.css"; // Importing CSS file for sidebar styles
import IncidentItem from "./IncidentItem";
import { useMQTTSubscribe } from "../../services/mqtt";

const Sidebar = ({ mqttClient }) => {
  const [incidents, setIncidents] = React.useState([]);

  useMQTTSubscribe(mqttClient, "violation", (message) => {
    const violation = JSON.parse(message);

    setIncidents([
      ...incidents,
      {
        location: violation.location,
        title: violation.location,
        description: violation.location,
        img: `data:image/jpeg;base64,${violation.thumbnail}`,
        time: new Date(violation.ts).toLocaleTimeString(),
      },
    ]);
  });

  return (
    <div className="sidebar">
      <div className="main-title"> ALERT NOTIFICATIONS </div>{" "}
      <div className="sidebar-content">
        {" "}
        {incidents.map((incident, index) => {
          return (
            <IncidentItem
              key={index}
              location={incident.location}
              time={incident.time}
              title={incident.title}
              desc={incident.description}
              img={incident.img}
            />
          );
        })}{" "}
      </div>{" "}
    </div>
  );
};

export default Sidebar;
