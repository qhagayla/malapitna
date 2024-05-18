import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteVideo } from '../../redux/video/videoSlice';
import { Button, Typography, Modal, Box } from '@mui/material';

const DeleteVideo = ({ videoId, onClose }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteVideo(videoId));
        onClose(); // Close modal after deleting the video
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    width: '80%',
                    maxWidth: 400,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h5">Delete Video</Typography>
                <Typography variant="body1" mt={2}>Do you want to delete the video?</Typography>
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="error" onClick={handleDelete} sx={{ m: 1 }}>Yes</Button>
                    <Button variant="contained" onClick={handleCancel} sx={{ m: 1 }}>No</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteVideo;
