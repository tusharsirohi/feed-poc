import React from "react";
import { useMQTTSubscribe } from "../services/mqtt";

export default function ZoneDisplay({ mqttClient, mqttTopic }) {
  const [img, setImg] = React.useState(null);

  console.log("Topic", mqttTopic);

  useMQTTSubscribe(mqttClient, mqttTopic, (message) => {
    // console.log("Message", message);
    setImg(`data:image/jpeg;base64,${message}`);
  });

  return <img src={img} width={"100%"} />;
}
