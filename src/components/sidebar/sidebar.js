// Sidebar.js

import React from "react";
import "./Sidebar.css"; // Importing CSS file for sidebar styles
import IncidentItem from "./IncidentItem";

const Sidebar = ({ incidents = [] }) => {
  return (
    <div className="sidebar">
      <div className="main-title"> ALERT NOTIFICATIONS </div>
      <div className="sidebar-content">
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
        })}
      </div>
    </div>
  );
};

export default Sidebar;
