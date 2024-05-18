import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientService from './clientService';

const initialState = {
    clients: [],
    isLoading: false,
    isError: false,
};

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    try {
        const clients = await clientService.fetchClients();
        return clients;
    } catch (error) {
        throw new Error('Failed to fetch clients');
    }
});

export const addClient = createAsyncThunk('clients/addClient', async (clientData) => {
    try {
        const newClient = await clientService.addClient(clientData);
        return newClient;
    } catch (error) {
        throw new Error('Failed to add client');
    }
});

export const editClient = createAsyncThunk('clients/editClient', async ({ clientId, clientData }) => {
    try {
        const editedClient = await clientService.editClient(clientId, clientData);
        return editedClient;
    } catch (error) {
        throw new Error('Failed to edit client');
    }
});

export const deleteClient = createAsyncThunk('clients/deleteClient', async (clientId) => {
    try {
        await clientService.deleteClient(clientId);
        return clientId;
    } catch (error) {
        throw new Error('Failed to delete client');
    }
});

export const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.clients = action.payload;
            })
            .addCase(fetchClients.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(addClient.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.clients.push(action.payload);
            })
            .addCase(addClient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(editClient.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(editClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const editedClientIndex = state.clients.findIndex(client => client.id === action.payload.id);
                if (editedClientIndex !== -1) {
                    state.clients[editedClientIndex] = action.payload;
                }
            })
            .addCase(editClient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(deleteClient.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.clients = state.clients.filter(client => client.id !== action.payload);
            })
            .addCase(deleteClient.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default clientSlice.reducer;