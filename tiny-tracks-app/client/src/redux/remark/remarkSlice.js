import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import remarkService from '../remark/remarkService';

const initialState = {
    remarks: [],
    isLoading: false,
    isError: false,
};

export const fetchRemarks = createAsyncThunk('remarks/fetchRemarks', async (videoId) => {
    try {
        const remarks = await remarkService.fetchRemarks(videoId);
        return remarks;
    } catch (error) {
        throw new Error('Failed to fetch remarks');
    }
});

export const saveRemarkAsync = createAsyncThunk('remarks/saveRemarkAsync', async (remarkData) => {
    try {
        const savedRemark = await remarkService.saveRemark(remarkData);
        return savedRemark;
    } catch (error) {
        throw new Error('Failed to save remark');
    }
});

export const remarkSlice = createSlice({
    name: 'remarks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRemarks.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchRemarks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.remarks = action.payload;
            })
            .addCase(fetchRemarks.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(saveRemarkAsync.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(saveRemarkAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.remarks.push(action.payload);
            })
            .addCase(saveRemarkAsync.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default remarkSlice.reducer;