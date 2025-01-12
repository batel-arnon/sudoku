// Ad.js
import React, { useEffect } from 'react';

// Ad component that will display Google ads
const Ad = ({ adClient, adSlot, adStyle }) => {

  useEffect(() => {
    // Reinitialize ads after the component is mounted
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Error displaying Google Ad:', e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={adStyle || { display: 'block', width: '300px', height: '250px' }}
         data-ad-client={adClient}
         data-ad-slot={adSlot}></ins>
  );
};

export default Ad;
