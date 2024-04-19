import React from "react";
import "./IncidentItem.css";

const IncidentItem = ({ location, time, title, desc, img}) => {
  return (
    <div className="incident-item">
      <div className="incident-img">
        <img width="100%" src={img} alt="" />
      </div>
      <div className="incident-detail">
        <div className="incident-date">
          <div>{location}</div>
          <div>
            <span> {time} </span>
          </div>
        </div>
        <div className="incident-title">
          <strong> {title} </strong>
        </div>
        <div className="incident-desc">
          <span>{desc} </span>
        </div>
      </div>
    </div>
  );
};

export default IncidentItem;
