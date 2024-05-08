import React from "react";
import mqtt from "mqtt";

export function useMQTTSubscribe(client, topic, onMessage) {
    // console.log("CLIENT", client);
    React.useEffect(() => {
        // console.log("CLIENT @", client);
        if (!client /* || !client.connected */ ) return;

        const handleMsg = (receivedTopic, message) => {
            // console.log("RECEIVED TOPIC", receivedTopic, message);
            if (receivedTopic === topic) {
                onMessage(message.toString());
            }
        };

        // console.log("TOPIC", topic);

        let i = setInterval(() => {
            if (client.connected) {
                clearInterval(i);

                console.log("Now Subscribing", topic);
                client.subscribe(topic);
                client.on("message", handleMsg);
            }
        }, 50);

        return () => {
            client.unsubscribe(topic);
            client.off("message", handleMsg);
        };
    }, [client, topic, onMessage]);
}

export function getMQTTClient({
    host,
    options,
    onConnect,
    onError,
    onMessage,
}) {
    const client = mqtt.connect(host, options);
    client.on("connect", (...args) => {
        console.log("Connected");
        typeof onConnect === "function" && onConnect(...args);
    });

    client.on("error", (err) => {
        console.error("Error connecting to the MQTT server", err);
        typeof onError === "function" && onError(err);
    });

    client.on("message", (topic, msg) => {
        // console.log("Message", topic, msg);
        typeof onMessage === "function" && onMessage(topic, msg);
    });

    return client;
}