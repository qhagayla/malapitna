import axios from 'axios';

const BACKEND_DOMAIN = 'http://localhost:8000';
const REMARKS_URL = `${BACKEND_DOMAIN}/v1/remarks/`;

const fetchRemarks = async (videoId) => {
  try {
    const response = await axios.get(REMARKS_URL, { params: { video: videoId } });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch remarks');
  }
};

const saveRemark = async (remarkData) => {
    try {
        const response = await axios.post(REMARKS_URL, remarkData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to save remark');
    }
};

const remarkService = {
    fetchRemarks,
    saveRemark,
};

export default remarkService;