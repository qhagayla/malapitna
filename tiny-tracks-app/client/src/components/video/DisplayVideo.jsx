import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const DisplayVideo = ({ videoUrl, caption, onClose }) => {
    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: 600,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 4,
                outline: 'none',
                textAlign: 'center'
            }}>
                <video src={videoUrl} controls style={{ width: '100%', marginBottom: '16px' }} />
                <Typography variant="body1">{caption}</Typography>
            </Box>
        </Modal>
    );
};

export default DisplayVideo;
