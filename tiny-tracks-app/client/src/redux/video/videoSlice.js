import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import videoService from '../video/videoService';

const initialState = {
    videos: [],
    isLoading: false,
    isError: false,
};

export const fetchVideos = createAsyncThunk('video/fetchVideos', async (movementType = 'all', { getState }) => {
    try {
        const { videoTypeFilter } = getState().video;
        const videos = await videoService.fetchVideos(movementType === 'all' ? videoTypeFilter : movementType);
        return videos.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));
    } catch (error) {
        throw new Error('Failed to fetch videos');
    }
});

export const uploadVideo = createAsyncThunk('video/uploadVideo', async (formData, { dispatch }) => {
    try {
        const uploadedVideo = await videoService.uploadVideo(formData);
        dispatch(fetchVideos());
        return uploadedVideo;
    } catch (error) {
        throw new Error('Failed to upload video');
    }
});

export const deleteVideo = createAsyncThunk('video/deleteVideo', async (id) => {
    try {
        await videoService.deleteVideo(id);
        return id; // Return the ID of the deleted video
    } catch (error) {
        throw new Error('Failed to delete video');
    }
});

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        // Define a reducer to remove the deleted video from the state
        removeVideo: (state, action) => {
            state.videos = state.videos.filter(video => video.id !== action.payload);
        },
        // Define a reducer to add the newly uploaded video to the state
        addUploadedVideo: (state, action) => {
            state.videos.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.videos = action.payload;
            })
            .addCase(fetchVideos.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(uploadVideo.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(uploadVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                // Call the addUploadedVideo reducer to add the uploaded video to the state
                state.videos.push(action.payload);
            })
            .addCase(uploadVideo.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(deleteVideo.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                // Call the removeVideo reducer to remove the deleted video from the state
                state.videos = state.videos.filter(video => video.id !== action.payload);
            })
            .addCase(deleteVideo.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { removeVideo, addUploadedVideo } = videoSlice.actions;

export default videoSlice.reducer;