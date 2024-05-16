import React from "react";
// import Webcam from "react-webcam";
import Sidebar from "./components/sidebar/sidebar";
import "./App.css";
import { getMQTTClient } from "./services/mqtt";
import ZoneDisplay from "./components/ZoneDisplay";
import AddCamModal from "./components/AddCamModal";
import UpdateCam from "./components/UpdateCam";
import { Grid ,Typography} from "@mui/material";
import Clock from'./components/Clock';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Vortex,DNA } from 'react-loader-spinner';
import { Button, Segment } from 'semantic-ui-react';
import gif from './wired-gradient-62-film.gif'; 
import gif1 from './wired-gradient-63-home.gif'; 
import gif2 from './tenor.gif'
import gif3 from './wired-gradient-678-fireman.gif'


const App = () => {
  const [mqttClient, setMqttClient] = React.useState();
  const [zones, setZones] = React.useState([
    { topic: "Zone_1", location: "Construction Site 1" },
    { topic: "Zone_2", location: "Forest Fire" },
    { topic: "Zone_3", location: "Construction Site 2" },
    { topic: "Zone_4", location: "Construction Site 3" },
    { topic: "Zone_5", location: "Construction Site 4" }
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
    const client = getMQTTClient({ host: "ws://172.20.30.107:9500" });
    setMqttClient(client);
  }, []);

  const handleButtonClick = async () => {
    toast.info('Request Send!');
    setLoading(true); 
    try {
      const response = await fetch('http://172.20.30.107:8000/all');
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
      <header style={{ backgroundColor: '#FFFFF', color: 'white', padding: '1px 1px', textAlign: 'center', borderRight: '1px solid black', borderTop: '1px solid black',width:'10dvw'}}>
        <img src='https://ispoc.impressicocrm.com/images/ibs-logo-big.png' alt="Logo" style={{ height: '80px', marginRight: '0px', marginTop: '10px' }} />
        <Typography variant="h5" className="typography-effect">COMPUTER VISION</Typography>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <img
              src={gif1}
              alt="loading gif"
              style={{ width: '35px', height: '35px', cursor: 'pointer' }}
            />
          </Link>
          <Link to="/fire" style={{ color: 'inherit', textDecoration: 'none' }}>
          <img
              src={gif2}
              alt="loading gif"
              style={{ width: '35px', height: '35px', cursor: 'pointer' }}
            />
            </Link> 
          <Link to="/ppe" style={{ color: 'inherit', textDecoration: 'none' }}>
          <img
              src={gif3}
              alt="loading gif"
              style={{ width: '35px', height: '35px', cursor: 'pointer' }}
            />
          </Link>
        </div>
        <style>
        {`
          .fixed-spinner {
            position: relative;
            top: 10%;
            left: 37%;
            transform: translate(-50%, -50%);
            z-index: 1;
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
            animation: bounce 5s infinite;
          }
        `}
      </style>
        {loading && (
        <DNA
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="fixed-spinner"
        />
      )}
      <div style={{ position: 'aboslute', top:'60%',justifyContent: 'center', alignItems: 'center'}}>
      
      <Segment inverted>
            <img
              src={gif}
              alt="loading gif"
              style={{
                position: 'absolute',
                top: '85%',
                left: '3%',
                width: '50px',
                height: '50px',
                cursor: 'pointer',
                animation: 'bounce 5s infinite'
              }}
              onClick={handleButtonClick}
            />
          </Segment>
            
              <Clock />
            </div>
      </header>
      <Grid container className="feed-container">
        {zones.map((zone, k) => (
          <Grid item md={4} key={k} className="feed-wrapper">
            <div className="main-title">
              {zone.location}
              <div className="feed-menu">
                <Button onClick={() => DeleteCamera(zone.topic)}>Delete</Button>
                <Button onClick={() => handleUpdateClick(zone)}>Update</Button>
              </div>
            </div>
            <ZoneDisplay mqttClient={mqttClient} mqttTopic={zone.topic} />
            <div style={{ position: 'relative' }}>
              <Clock />
            </div>
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
