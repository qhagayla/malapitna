import axios from "axios";
import { BASE_URL } from "@/../Globals.js";

export async function getProfile(payload) {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload?.access}`,
    };

    try {
        const response = await axios.get(`${BASE_URL}/user/profile/`, {
            method: "GET",
            headers: headers,
        });

        // console.log(response.data);
        return response;
    } catch (error) {
        console.log(error.response);
        throw error;
    }
}
