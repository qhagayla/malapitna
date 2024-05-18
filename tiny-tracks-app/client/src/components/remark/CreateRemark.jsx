import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveRemarkAsync } from '../../redux/remark/remarkSlice';
import { Button, FormControl, InputLabel, Select, MenuItem, TextField, Typography, Modal, Box } from '@mui/material';

const CreateRemark = ({ onClose }) => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.videos);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false); // State to track whether the text field is focused
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSaveRemark = () => {
    if (!selectedVideo || !text) return;
    dispatch(
      saveRemarkAsync({
        video: selectedVideo,
        text: text
      })
    );
    setSelectedVideo('');
    setText('');
    onClose();
  };

  const handleSelectChange = (event) => {
    setSelectedVideo(event.target.value);
  };

  const handleSelectMouseDown = (event) => {
    // Prevent the modal from closing when clicking inside the Select component
    event.stopPropagation();
  };

  const handleTextFieldFocus = () => {
    setIsFocused(true);
  };

  const handleTextFieldBlur = () => {
    setIsFocused(false);
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom>Create Remark</Typography>
        <Button className="modal-close is-large" aria-label="close" onClick={onClose}></Button>
        <form ref={formRef} style={{ width: '100%' }}>
          <FormControl fullWidth style={{ marginBottom: '10px' }}>
            <InputLabel>Select Video</InputLabel>
            <Select
              value={selectedVideo}
              onChange={handleSelectChange}
              onMouseDown={handleSelectMouseDown} // Prevent closing the modal when clicking inside the Select
            >
              <MenuItem value="">Select Video</MenuItem>
              {videos.map((video) => (
                <MenuItem key={video.id} value={video.id}>{video.caption}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="subtitle1" gutterBottom>Remark Text</Typography>
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              multiline
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={handleTextFieldFocus}
              onBlur={handleTextFieldBlur}
              placeholder="Enter your remark text here"
            />
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleSaveRemark}>Save Remark</Button>
            <Button onClick={onClose} variant="outlined" style={{ marginLeft: '10px' }}>Close</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateRemark;
