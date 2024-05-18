import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideos } from '../../../redux/video/videoSlice';
import { fetchClients } from '../../../redux/client/clientSlice';
import UploadVideo from '../../../components/video/UploadVideo';
import CreateRemark from '../../../components/remark/CreateRemark';
import DeleteVideo from '../../../components/video/DeleteVideo';
import DisplayRemark from '../../../components/remark/DisplayRemark';
import DisplayVideo from '../../../components/video/DisplayVideo';
import { Button, Typography, Box, Card, CardActions, CardContent, Select, MenuItem } from '@mui/material';

const VideoDashboard = () => {
    const dispatch = useDispatch();
    const { videos, isLoading, isError } = useSelector((state) => state.video);
    const { clients } = useSelector((state) => state.client);
    const [showUploadVideo, setShowUploadVideo] = useState(false);
    const [showDeleteVideo, setShowDeleteVideo] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);
    const [showCreateRemark, setShowCreateRemark] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showDisplayRemark, setShowDisplayRemark] = useState(false);
    const [showDisplayVideo, setShowDisplayVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [videoCaption, setVideoCaption] = useState('');
    const [videoTypeFilter, setVideoTypeFilter] = useState('all');

    useEffect(() => {
        dispatch(fetchVideos());
        dispatch(fetchClients());
    }, [dispatch]);

    const toggleUploadVideo = () => {
        setShowUploadVideo(!showUploadVideo);
    };

    const toggleDeleteVideo = (videoId) => {
        setVideoToDelete(videoId);
        setShowDeleteVideo(!showDeleteVideo);
        setShowDisplayVideo(false); // Ensure that the video display is hidden when delete button is clicked
    };

    const handleCancel = () => {
        setShowDeleteVideo(false);
    };

    const handleRemark = (e, video) => {
        e.stopPropagation();
        setSelectedVideo(video);
        setShowDisplayRemark(true);
    };

    const handleAddRemarks = () => {
        setShowCreateRemark(true);
    };

    const handleCaptionClick = (video) => {
        setVideoUrl(video.video);
        setVideoCaption(video.caption);
        setShowDisplayVideo(true);
    };

    const handleDeleteVideo = (e, videoId) => {
        e.stopPropagation();
        toggleDeleteVideo(videoId);
        setShowDisplayVideo(false); // Hide video display after delete button clicked
    };

    const handleFilterChange = (e) => {
        setVideoTypeFilter(e.target.value);
    };

    const filteredVideos = videoTypeFilter === 'all' ? videos : videos.filter(video => video.movement_type === videoTypeFilter);

    return (
        <Box p={3}>
            <Typography variant="h3" align="center">Video List</Typography>
            <Box mt={2} mb={2} display="flex" alignItems="center">
                <Select
                    value={videoTypeFilter}
                    onChange={handleFilterChange}
                    variant="outlined"
                    style={{ marginRight: '10px' }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="run">Run</MenuItem>
                    <MenuItem value="gallop">Gallop</MenuItem>
                    <MenuItem value="hop">Hop</MenuItem>
                    <MenuItem value="leap">Leap</MenuItem>
                    <MenuItem value="horizontal_jump">Horizontal Jump</MenuItem>
                    <MenuItem value="slide">Slide</MenuItem>
                    <MenuItem value="skip">Skip</MenuItem>
                </Select>
                <Button variant="contained" color="primary" onClick={toggleUploadVideo}>Upload</Button>
                <Button variant="contained" color="primary" onClick={handleAddRemarks} style={{ marginLeft: '10px' }}>Add Remarks</Button>
                {showUploadVideo && <UploadVideo onClose={toggleUploadVideo} />}
            </Box>
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : isError ? (
                <Typography>Error loading videos</Typography>
            ) : filteredVideos.length === 0 ? (
                <Typography>No videos available</Typography>
            ) : (
                <div className="video-list">
                    {filteredVideos.map((video, index) => (
                        <Card key={index} style={{ marginBottom: '10px', cursor: 'pointer' }}>
                            <CardContent onClick={() => handleCaptionClick(video)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Typography variant="body1" component="div" noWrap>
                                        {video.caption} - {video.client_name ? video.client_name : 'No client'}
                                    </Typography>
                                </div>
                                <CardActions disableSpacing>
                                    <Button variant="contained" color="primary" onClick={(e) => handleRemark(e, video)} style={{ marginRight: '8px' }}>Remark</Button>
                                    <Button variant="contained" color="error" onClick={(e) => handleDeleteVideo(e, video.id)} style={{ paddingLeft: '8px' }}>Delete</Button>
                                </CardActions>
                            </CardContent>
                            {showDeleteVideo && videoToDelete === video.id && (
                                <DeleteVideo
                                    videoId={videoToDelete}
                                    onClose={handleCancel}
                                />
                            )}
                        </Card>
                    ))}
                </div>
            )}
            {showCreateRemark && (
                <CreateRemark
                    onClose={() => setShowCreateRemark(false)}
                    selectedVideo={selectedVideo}
                />
            )}
            {showDisplayRemark && (
                <DisplayRemark
                    isOpen={showDisplayRemark}
                    onClose={() => setShowDisplayRemark(false)}
                    videoId={selectedVideo.id}
                    caption={selectedVideo.caption}
                />
            )}
            {showDisplayVideo && (
                <DisplayVideo
                    videoUrl={videoUrl}
                    caption={videoCaption}
                    onClose={() => setShowDisplayVideo(false)}
                />
            )}
        </Box>
    );
};

export default VideoDashboard;
