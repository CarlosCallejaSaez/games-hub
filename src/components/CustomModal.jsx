import React from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';

const CustomModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(./cyberpunk.gif)', 
          backgroundSize: 'cover', 
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          🙋‍♂️ Hi! My name is Carlos Calleja Sáez
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Student of RockTheCode 🤘
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;
