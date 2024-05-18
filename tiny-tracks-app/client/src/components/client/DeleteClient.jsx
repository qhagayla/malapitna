import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const DeleteClient = ({ client, onDelete, onClose }) => {
    const handleDelete = () => {
        onDelete(client.id);
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
                    maxWidth: 400,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom>Delete Client</Typography>
                <Typography variant="body1" gutterBottom>Are you sure you want to delete {client.name}?</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <Button variant="contained" color="error" onClick={handleDelete} fullWidth>Delete</Button>
                    <Button variant="contained" onClick={onClose} fullWidth>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteClient;
