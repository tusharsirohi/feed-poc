import React, { useEffect, useState } from 'react';
import Sidebar from './components/sidebar/sidebar';
import ZoneDisplay from './components/ZoneDisplay';
import { Typography } from '@mui/material';
import { getMQTTClient } from "./services/mqtt";
import Clock from './components/Clock';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Vortex ,DNA} from 'react-loader-spinner';
import { Button, Segment } from 'semantic-ui-react'
import gif from './wired-gradient-62-film.gif'; 
import gif1 from './wired-gradient-63-home.gif'; 
import gif2 from './tenor.gif'
import gif3 from './wired-gradient-678-fireman.gif'

const Ppe = () => {
  const [mqttClient, setMqttClient] = useState(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const client = getMQTTClient({ host: 'ws://172.20.30.107:9500' });
    setMqttClient(client);

    return () => {
      if (client) {
        client.end(true); 
      }
    };
  }, []);

  const handleButtonClick = async () => {
    toast.info('Request Send!');
    setLoading(true);
    try {
      const response = await fetch('http://172.20.30.107:8000/ppe');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      toast.success('Process complete 😎');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
    }finally {
      setLoading(false); 
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <header
        style={{
          backgroundColor: '#FFFFFF',
          color: 'white',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid black'
        }}
      >
        <img
          src='https://ispoc.impressicocrm.com/images/ibs-logo-big.png'
          alt='Logo'
          style={{ height: '70px', marginRight: '10px' }}
        />
        <Typography variant='h4' style={{ margin: 0, flexGrow: 1, textAlign: 'center', color: 'black' }}>
          PPE Detection 🦺
        </Typography>
        <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <img
              src={gif1}
              alt="loading gif"
              style={{ width: '45px', height: '45px', cursor: 'pointer' }}
            />
          </Link>
          <Link to="/fire" style={{ color: 'inherit', textDecoration: 'none' }}>
          <img
              src={gif2}
              alt="loading gif"
              style={{ width: '45px', height: '45px', cursor: 'pointer' }}
            />
            </Link> 
          <Link to="/ppe" style={{ color: 'inherit', textDecoration: 'none' }}>
          <img
              src={gif3}
              alt="loading gif"
              style={{ width: '45px', height: '45px', cursor: 'pointer' }}
            />
          </Link>
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
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
        <div style={{ flex: 3, padding: '4px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
          {mqttClient && <ZoneDisplay mqttClient={mqttClient} mqttTopic="Zone_4" />}
          <Clock />
          <style>
        {`
          .fixed-spinner {
            position: fixed;
            top: 8%;
            left: 71%;
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
            animation: bounce 5s infinite;
          }
        `}
      </style>
      <img
              src={gif}
              alt="loading gif"
              style={{
                position: 'absolute',
                top: '85%',
                left: '4%',
                width: '50px',
                height: '50px',
                cursor: 'pointer',
                animation: 'bounce 5s infinite'
              }}
              onClick={handleButtonClick}
            />
        </div>
        <Sidebar mqttClient={mqttClient} zoneTopic='Zone_4' />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Ppe;
