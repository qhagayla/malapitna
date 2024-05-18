import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    register,
    login,
    getAccessToken,
} from "@/services/api/authentication.js";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (payload) => {
        const response = await register(payload);
        return response;
    }
);

export const loginUser = createAsyncThunk("auth/loginUser", async (payload) => {
    const response = await login(payload);
    return response;
});

export const refreshAccessToken = createAsyncThunk(
    "auth/refreshAccessToken",
    async (payload) => {
        const response = await getAccessToken(payload);
        return response.data;
    }
);

// Initial state
const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
};

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.access;
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                (action) =>
                    action.type.endsWith("/fulfilled") ||
                    action.type.endsWith("/rejected"),
                (state) => {
                    state.isLoading = false;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.error = action.error.message;
                }
            );
    },
});

export default authSlice.reducer;
