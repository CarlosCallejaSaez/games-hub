import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import queryString from 'query-string';

const VideoComponent = ({ videoUrl, onVideoEnded }) => {

  const videoId = queryString.parseUrl(videoUrl).query.v;

  const opts = {
    height: '400',
    width: '400',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {

    event.target.playVideo();
  };

  const onEnd = () => {
    
    onVideoEnded && onVideoEnded();
  };

  useEffect(() => {
  
    const newVideoId = queryString.parseUrl(videoUrl).query.v;
    if (newVideoId !== videoId) {
      
      setVideoId(newVideoId);
    }
  }, [videoUrl, videoId]);

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
    }}
  >
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={onReady}
      onEnd={onEnd}
    />
    </div>
  );
};

export default VideoComponent;
