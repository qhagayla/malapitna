import axios from 'axios';

const BACKEND_DOMAIN = 'http://localhost:8000';
const VIDEO_URL = `${BACKEND_DOMAIN}/v1/videos/`;

const fetchVideos = async (movementType = 'all') => {
    try {
        const response = await axios.get(`${VIDEO_URL}?ordering=-upload_date&movement_type=${movementType}`); // Ordering by upload_date in descending order (latest first)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch videos');
    }
  };

const uploadVideo = async (formData) => {
    try {
        const response = await axios.post(VIDEO_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to upload video');
    }
};

const deleteVideo = async (id) => {
    try {
        await axios.delete(`${VIDEO_URL}${id}/`);
        return id; // Return the ID of the deleted video
    } catch (error) {
        throw new Error('Failed to delete video');
    }
};

const videoService = {
    fetchVideos,
    uploadVideo,
    deleteVideo,
};

export default videoService;