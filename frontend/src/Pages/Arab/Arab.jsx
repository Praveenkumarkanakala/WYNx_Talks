import React from 'react';
import myImage from './Arabwomen.jpeg';

export default function FullImagePage() {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <img
        src={myImage}
        alt="Full page"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />
    </div>
  );
}