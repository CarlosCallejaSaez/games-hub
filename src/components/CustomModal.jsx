import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';

const CustomModal = ({ open, onClose }) => {
  const [audio] = useState(new Audio("../assets/Tetris.mp3"));

  useEffect(() => {
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          background: 'linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)',
          padding: '20px',
        }}
      >
       <div className="modal" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          <Typography variant="h4" align="center">
          
            🙋‍♂️ Hi! My name is Carlos Carlos Calleja Sáez
          </Typography>
          <Typography variant="body1" align="center">
            Student of RockTheCode 🤘
          </Typography>
          <img src='/public/me.jpg'/>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Box>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModal;
