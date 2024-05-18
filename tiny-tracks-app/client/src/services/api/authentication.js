import axios from "axios";
import { BASE_URL } from "@/../Globals.js";

/**
 * Makes a POST request to the register endpoint of the backend API.
 * @param {Object} payload - The data to be sent in the request body.
 * @returns {Object} The response data from the API.
 */
export async function register(payload) {
    try {
        const response = await axios.post(`${BASE_URL}/register/`, payload);
        return response;
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
}

/**
 * Makes a POST request to the login endpoint of the backend API.
 * @param {Object} payload - The data to be sent in the request body.
 * @returns {Object} The response data from the API.
 */
export async function login(payload) {
    try {
        const response = await axios.post(`${BASE_URL}/login/`, payload);
        return response;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function getAccessToken(payload) {
    try {
        const response = await axios.post(`${BASE_URL}/login/refresh/`, {
            refresh: payload?.refresh,
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
