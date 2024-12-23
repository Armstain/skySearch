import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;
const SECRET_CODE = import.meta.env.VITE_APP_SECRET_CODE;


const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'API-KEY': API_KEY,
        'SECRET-CODE': SECRET_CODE
    }
});

// fetch airport Data for autocomplete
export const fetchAirportData = async (): Promise<any> => {
    try {
        const response = await apiClient.get("/tools/airport-autosuggetion-data");
        return response.data;
    } catch (error) {
        console.error("Error fetching airport data:", error);
        throw error;
    }
};
