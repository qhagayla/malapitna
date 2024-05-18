import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRemarks } from '../../redux/remark/remarkSlice';
import { Modal, Backdrop, Box, Typography, Button } from '@mui/material';

const DisplayRemark = ({ isOpen, onClose, videoId, caption }) => {
  const dispatch = useDispatch();
  const [latestRemark, setLatestRemark] = useState('');

  const remarks = useSelector((state) => state.remark.remarks);

  useEffect(() => {
    if (isOpen && videoId) {
      dispatch(fetchRemarks(videoId));
    }
  }, [isOpen, videoId, dispatch]);

  useEffect(() => {
    const remarksForVideo = remarks.filter(remark => remark.video === videoId);
    const latestRemarkForVideo = remarksForVideo.length > 0 ? remarksForVideo.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] : null;
    if (latestRemarkForVideo) {
      setLatestRemark(latestRemarkForVideo.text);
    } else {
      setLatestRemark('No remarks available');
    }
  }, [remarks, videoId]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      BackdropComponent={Backdrop}
      className="remarks-modal"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
          maxWidth: 400,
          width: '100%'
        }}
      >
        <Typography variant="h6" gutterBottom style={{textAlign: 'center'}}>
          Latest Remark for {caption} Video
        </Typography>
        <Typography variant="body1" gutterBottom>
          {latestRemark}
        </Typography>
        <Button variant="outlined" onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DisplayRemark;
