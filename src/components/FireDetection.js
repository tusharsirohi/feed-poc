import React from 'react';
import Sidebar from './components/sidebar/sidebar';
import ZoneDisplay from './components/ZoneDisplay';
import { Grid, Typography } from '@mui/material';

const FireDetection = () => {
  const mqttClient = React.useEffect(() => {
    const client = getMQTTClient({ host: 'ws://localhost:9500' });
    return client;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', textAlign: 'center' }}>
        <Typography variant="h4">Fire Detection</Typography>
      </header>
      <Grid container style={{ flexGrow: 1 }}>
        <Grid item xs={12} md={9} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <ZoneDisplay mqttClient={mqttClient} mqttTopic="Zone_1" />
        </Grid>
        <Grid item xs={12} md={3}>
          <Sidebar mqttClient={mqttClient} />
        </Grid>
      </Grid>
    </div>
  );
};

export default FireDetection;