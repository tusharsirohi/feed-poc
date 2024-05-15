import React, { useEffect, useState } from 'react';
import Sidebar from './components/sidebar/sidebar';
import ZoneDisplay from './components/ZoneDisplay';
import { Typography } from '@mui/material';
import { getMQTTClient} from "./services/mqtt";
import Clock from'./components/Clock';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Vortex , DNA} from 'react-loader-spinner';

const Fire = () => {
    const [mqttClient, setMqttClient] = useState(null);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
      const client = getMQTTClient({ host: 'ws://localhost:9500' });
      setMqttClient(client);
  
      return () => {
        if (client) {
          client.end(true); 
        }
      };
    }, []);

    const handleButtonClick = async () => {
      toast.info('Request successful');
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/fire');
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
              backgroundColor: '#FFFFF',
              color: 'white',
              padding: '10px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid black'
            }}
          >
          <img src='https://ispoc.impressicocrm.com/images/ibs-logo-big.png' alt="Logo" style={{ height: '70px', marginRight: '10px' }} />
            <Typography variant="h4" style={{ margin: 0, flexGrow: 1, textAlign: 'center',color: 'black' }}>Fire Detection 🔥</Typography>
            <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none',fontSize: '28px' }}>🪟</Link> {/* Window */}
          <Link to="/fire" style={{ color: 'inherit', textDecoration: 'none',fontSize: '28px' }}>🔥</Link> {/* Fire */}
          <Link to="/ppe" style={{ color: 'inherit', textDecoration: 'none',fontSize: '28px' }}>🦺</Link> {/* Safety */}
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
              {mqttClient && <ZoneDisplay mqttClient={mqttClient} mqttTopic="Zone_2" />}
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
        </div>
            <Sidebar mqttClient={mqttClient} zoneTopic="Zone_2" />
          </div>
          <ToastContainer />
        </div>
      );
    };

export default Fire;
