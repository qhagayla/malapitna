import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';

const AddClient = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        birthdate: '',
        date_of_assessment: '',
        gender: '',
        grade_level: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
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
                    maxWidth: 400
                }}
            >
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Add Client
                </Typography>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <TextField
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }} // Label inside border
                    />
                    <TextField
                        label="Age"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }} // Label inside border
                    />
                    <TextField
                        label="Birthdate"
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }} // Label inside border
                    />
                    <TextField
                        label="Date of Assessment"
                        type="date"
                        name="date_of_assessment"
                        value={formData.date_of_assessment}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }} // Label inside border
                    />
                    <InputLabel shrink>Gender</InputLabel>
                    <Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    <TextField
                        label="Grade Level"
                        type="text"
                        name="grade_level"
                        value={formData.grade_level}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }} // Label inside border
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                        <Button variant="contained" onClick={onClose}>
                            Close
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default AddClient;
