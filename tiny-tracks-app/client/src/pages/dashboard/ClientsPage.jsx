import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, addClient, editClient, deleteClient } from '../../redux/client/clientSlice';
import AddClient from '../../components/client/AddClient';
import EditClient from '../../components/client/EditClient';
import DeleteClient from '../../components/client/DeleteClient';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ClientsPage = () => {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.client.clients);
    const isLoading = useSelector((state) => state.client.isLoading);

    const [showAddClient, setShowAddClient] = useState(false);
    const [showEditClient, setShowEditClient] = useState(false);
    const [showDeleteClient, setShowDeleteClient] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const handleAddClientClick = () => setShowAddClient(true);

    const handleCloseModal = () => {
        setShowAddClient(false);
        setShowEditClient(false);
        setShowDeleteClient(false);
        setSelectedClient(null);
    };

    const handleClientFormSubmit = (formData) => {
        dispatch(addClient(formData));
        setShowAddClient(false);
    };

    const handleEditClick = (client) => {
        setSelectedClient(client);
        setShowEditClient(true);
    };

    const handleEditSubmit = (formData) => {
        dispatch(editClient({ clientId: selectedClient.id, clientData: formData }));
        setShowEditClient(false);
    };

    const handleDeleteClick = (client) => {
        setSelectedClient(client);
        setShowDeleteClient(true);
    };

    const handleDeleteSubmit = () => {
        dispatch(deleteClient(selectedClient.id));
        setShowDeleteClient(false);
    };

    // Function to format date in "Month day, year" format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="client-page">
            <Typography variant="h4" component="h1" style={{ textAlign: 'center', marginBottom: '20px' }}>Clients</Typography>
            <Button variant="contained" color="primary" onClick={handleAddClientClick} style={{ marginBottom: '20px', marginLeft: '20px' }}>Add Client</Button>
            <Modal open={showAddClient} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400 }}>
                    <AddClient onSubmit={handleClientFormSubmit} onClose={handleCloseModal} />
                </Box>
            </Modal>
            <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {clients.map((client) => (
                            <Card key={client.id} sx={{ minWidth: 275, marginBottom: 10, position: 'relative' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {client.name}
                                    </Typography>
                                    <Typography variant="body1">Age: {client.age}</Typography>
                                    <Typography variant="body1">Birthdate: {formatDate(client.birthdate)}</Typography>
                                    <Typography variant="body1">Date of Assessment: {formatDate(client.date_of_assessment)}</Typography>
                                    <Typography variant="body1">Gender: {client.gender}</Typography>
                                    <Typography variant="body1">Grade Level: {client.grade_level}</Typography>
                                </CardContent>
                                <div style={{ position: 'absolute', top: 20, right: 20 }}>
                                    <Button variant="contained" color="primary" onClick={() => handleEditClick(client)} sx={{ width: '100%' }}>Edit</Button>
                                </div>
                                <div style={{ position: 'absolute', top: 70, right: 0 }}>
                                    <Button variant="contained" color="error" onClick={() => handleDeleteClick(client)} sx={{ width: '60%' }}>Delete</Button>
                                </div>
                            </Card>
                        ))}
                    </ul>
                )}
            </Box>
            <Modal open={showEditClient} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400 }}>
                    <EditClient client={selectedClient} onUpdate={handleEditSubmit} onClose={handleCloseModal} />
                </Box>
            </Modal>
            <Modal open={showDeleteClient} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400 }}>
                    <DeleteClient client={selectedClient} onDelete={handleDeleteSubmit} onClose={handleCloseModal} />
                </Box>
            </Modal>
        </div>
    );
};

export default ClientsPage;
