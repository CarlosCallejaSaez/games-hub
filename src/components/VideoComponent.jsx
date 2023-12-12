import React, { useRef, useEffect } from 'react';

const VideoComponent = ({ videoUrl, onVideoEnded }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideoFullscreen = () => {
      if (videoRef.current) {
        videoRef.current.requestFullscreen();
        videoRef.current.play();
        videoRef.current.addEventListener('ended', onVideoEnded);
      }
    };

    playVideoFullscreen(); 

    return () => {
     
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', onVideoEnded);
      }
    };
  }, [onVideoEnded]);

  return (
    <div>
      <video ref={videoRef} src={videoUrl} autoPlay muted playsInline style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
};

export default VideoComponent;