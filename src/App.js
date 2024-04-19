import React from "react";
// import Webcam from "react-webcam";
import Sidebar from "./components/sidebar/sidebar";
import "./App.css";
import { getMQTTClient, useMQTTSubscribe } from "./services/mqtt";
import ZoneDisplay from "./components/ZoneDisplay";
import AddCamModal from "./components/AddCamModal";
import UpdateCam from "./components/UpdateCam";
import { Button, Grid } from "@mui/material";

const App = () => {
  const [mqttClient, setMqttClient] = React.useState();
  const [zones, setZones] = React.useState([
    { topic: "Zone_1", location: "Location 1" },
    { topic: "Zone_1", location: "Location 2" },
    { topic: "Zone_1", location: "Location 3" },
  ]);

  const [selectedZone, setSelectedZone] = React.useState(null);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openUpdateModal, setopenUpdateModal] = React.useState(false);

  const handleOpen = () => setOpenAddModal(true);
  const handleClose = () => setOpenAddModal(false);

  const handleupdateOpen = () => setopenUpdateModal(true);
  const handleUpdateClose = () => setopenUpdateModal(false);

  function onAddZoneClick(zone) {
    console.log(zone);
    addZone(zone);
    handleClose();

    // TODO: Get topic from modal textbox
    // TODO: Get location from modal textbox
    // TODO: Call addZone({ topic: topic, location: location });
  }

  const addZone = (zone) => {
    // zones.push(zone);
    setZones([...zones, zone]);
  };

  const DeleteCamera = (topic) => {
    setZones(zones.filter((zone) => zone.topic !== topic));
  };

 const handleUpdateClick = (zone) => {
   setSelectedZone(zone);
   handleupdateOpen();
 };

  const handleUpdate = (updatedZone) => {
    const index = zones.findIndex((zone) => zone.topic === updatedZone.topic);
    if (index !== -1) {
      const updatedZones = [...zones];
      updatedZones[index] = updatedZone;
      setZones(updatedZones);
    }
  };

  React.useEffect(() => {
    const client = getMQTTClient({ host: "ws://localhost:9001" });
    setMqttClient(client);
  }, []);

  const incidents = [
    {
      location: "Site location - 2",
      time: "12: 30",
      title: "VAST",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    },
    {
      location: "Site location - 4",
      time: "09: 30",
      title: "BNND",
      description:
        "Sajdg ASJDB , consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    },
    {
      location: "Site location - 6",
      time: "06: 30",
      title: "BNNDeee",
      description:
        "Sajdg ASJDB , consetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Grid container className="feed-container">
        {zones.map((zone, k) => (
          <Grid item md={4} key={k} className="feed-wrapper">
            <div className="main-title">
              {" "}
              {zone.location}
              <div className="feed-menu">
                <Button onClick={() => DeleteCamera(zone.topic)}>Delete</Button>
                <Button onClick={() => handleUpdateClick(zone)}>Update</Button>
              </div>
            </div>
            <ZoneDisplay mqttClient={mqttClient} mqttTopic={zone.topic} />
          </Grid>
        ))}
        <Grid
          md={4}
          className="feed-wrapper"
          style={{ textAlign: "center", border: "1px solid white" }}
        >
          <Button
            style={{ marginTop: "40%" }}
            variant="contained"
            onClick={handleOpen}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Sidebar incidents={incidents} />
      <AddCamModal
        open={openAddModal}
        handleClose={handleClose}
        sendDataToParent={onAddZoneClick}
      />
      <UpdateCam
        open={openUpdateModal}
        selectedZone={selectedZone}
        handleClose={handleUpdateClose}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};
export default App;
