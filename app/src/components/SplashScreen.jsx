import React, { useEffect, useRef } from 'react';

const SplashScreen = ({ videoSrc, onFinish }) => {
  const finished = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!finished.current) {
        finished.current = true;
        onFinish();
      }
    }, 5000); // 6 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleEnded = () => {
    if (!finished.current) {
      finished.current = true;
      onFinish();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#000',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
        style={{ maxWidth: '100vw', maxHeight: '100vh', objectFit: 'contain' }}
        // style={{ maxWidth: '100vw', height: '100vh', objectFit: 'cover' }}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default SplashScreen;
