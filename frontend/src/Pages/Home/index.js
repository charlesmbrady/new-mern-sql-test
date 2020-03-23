import './style.css';
import React, { useState } from 'react';
import API from '../../Utilities/API';

export default function Home() {
  const [healthy, setHealthy] = useState(false);
  const healthcheck = () => {
    API.healthcheck(res => {
      if (res) {
        console.log('app is healthy');
        setHealthy(true);
      }
    });
  };

  return (
    <div>
      <h1>Healthcheck</h1>
      <button onClick={() => healthcheck()}>ping</button>

      {healthy && <div>App is healthy!</div>}
    </div>
  );
}
