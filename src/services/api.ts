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
// search flight params
export type SearchFlightParams = {
    journey_type: 'OneWay' | 'RoundTrip' | 'MultiCity';
    segment: {
        departure_airport_type: 'CITY' | 'AIRPORT';
        departure_airport: string;
        arrival_airport_type: 'CITY' | 'AIRPORT';
        arrival_airport: string;
        departure_date: string;
    }[];
    travelers_adult: number;
    travelers_child: number;
    travelers_child_age: number;
    travelers_infants: number;
    travelers_infants_age: string[];
    preferred_carrier: (string | null)[];
    non_stop_flight: 'any' | 'non-stop';
    baggage_option: 'any' | 'only-baggage';
    booking_class: 'Economy' | 'Premium-Economy' | 'Business' | 'First-Class';
    supplier_uid: string;
    partner_id: string;
    language: string;
}

// search flight
export const searchFlight = async (params: SearchFlightParams): Promise<any> => {
    try {
        const response = await apiClient.post("/tools/flight-search", params);
        return response.data;
    } catch (error) {
        console.error("Error searching flights:", error);
        throw error;
    }
}
// get auto suggestion for airport
export const getAutoSuggestionForAirport = async (): Promise<any> => {
    try {
        const response = await apiClient.get("/tools/airport-autosuggetion-data");
        return response.data;
    } catch (error) {
        console.error("Error fetching airport data:", error);
        throw error;
    }
}
