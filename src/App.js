import React from "react";
// import Webcam from "react-webcam";
import Sidebar from "./components/sidebar/sidebar";
import "./App.css";
import { getMQTTClient } from "./services/mqtt";
import ZoneDisplay from "./components/ZoneDisplay";
import AddCamModal from "./components/AddCamModal";
import UpdateCam from "./components/UpdateCam";
import { Button, Grid ,Typography} from "@mui/material";
import Clock from'./components/Clock';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Vortex,DNA } from 'react-loader-spinner';


const App = () => {
  const [mqttClient, setMqttClient] = React.useState();
  const [zones, setZones] = React.useState([
    { topic: "Zone_1", location: "Location 1" },
    { topic: "Zone_2", location: "Location 2" },
    { topic: "Zone_3", location: "Location 3" },
  ]);
  const [loading, setLoading] = React.useState(false);


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
    const client = getMQTTClient({ host: "ws://localhost:9500" });
    setMqttClient(client);
  }, []);

  const handleButtonClick = async () => {
    toast.info('Request successful');
    setLoading(true); 
    try {
      const response = await fetch('http://localhost:8000/all');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      toast.success('Process complete 😎');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
    } finally{
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex'}}>
      <header style={{ backgroundColor: '#FFFFF', color: 'white', padding: '1px 1px', textAlign: 'center' ,borderRight: '2px solid black',borderTop: '2px solid black'}}>
      <img src='https://ispoc.impressicocrm.com/images/ibs-logo-big.png' alt="Logo" style={{ height: '80px', marginRight: '0px',marginTop: '10px' }} />
            <Typography variant="h6" style ={{marginTop: '10px',color: 'black', fontFamily: "fantasy"}}>COMPUTER VISION</Typography>
            <div style={{ display: 'flex', gap: '10px',marginTop: '10px' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', fontSize: '28px' ,marginLeft: '3px '}}>🪟</Link> {/* Window */}
          <Link to="/fire" style={{ color: 'inherit', textDecoration: 'none' , fontSize: '28px'}}>🔥</Link> {/* Fire */}
          <Link to="/ppe" style={{ color: 'inherit', textDecoration: 'none' , fontSize: '28px'}}>🦺</Link> {/* Safety */}
        </div>
          </header>
          {loading && (
      <DNA
      visible={true}
      height="100"
      width="100"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="fixed-spinner "
      />
    )}
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
            <Clock />
            <style>
        {`
          .fixed-spinner {
            position: fixed;
            top: 50%;
            left: 5%;
            transform: translate(-50%, -50%);
            z-index: 1000;
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-20px);
            }
            60% {
              transform: translateY(-10px);
            }
          }
          .bounce {
            animation: bounce 10s infinite;
          }
        `}
      </style>
            <button
            style={{
              position: 'absolute',
              left: '40px',
              bottom: '50px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '32px',
              cursor: 'pointer',
              animation: 'bounce 10s infinite'
            }}
            onClick={handleButtonClick}
          >
            ▶️
          </button>
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
      
      <ToastContainer />
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
      <Sidebar mqttClient={mqttClient} />
    </div>
    
  );
};
export default App;
