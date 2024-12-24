import { Store } from "pullstate";
import { getAutoSuggestionForAirport, SearchFlightParams } from "@/services/api";

type Airport = {
    code: string;
    airport_name: string;
    city_name: string;
    country_name: string;
    city_code: string;
    priority: string;
    search_contents: string;
}

type FlightStoreState = {
    airports: Record<string, Airport>;
    loading: boolean;
    error: string | null;
    searchParams: SearchFlightParams;
    searchResults: any | null;
}

const initialSearchParams: SearchFlightParams = {
    journey_type: 'OneWay',
    segment: [{
        departure_airport_type: 'AIRPORT',
        departure_airport: '',
        arrival_airport_type: 'AIRPORT',
        arrival_airport: '',
        departure_date: new Date().toISOString().split('T')[0]
    }],
    travelers_adult: 1,
    travelers_child: 0,
    travelers_child_age: 0,
    travelers_infants: 0,
    travelers_infants_age: [''],
    preferred_carrier: [null],
    non_stop_flight: 'any',
    baggage_option: 'any',
    booking_class: 'Economy',
    supplier_uid: 'all',
    partner_id: '',
    language: 'en'
};

export const FlightStore = new Store<FlightStoreState>({
    airports: {},
    loading: false,
    error: null,
    searchParams: initialSearchParams,
    searchResults: null
});

export const flightStoreActions = {
    async fetchAirports() {
        FlightStore.update(s => { s.loading = true; s.error = null; });
        try {
            const response = await getAutoSuggestionForAirport();
            const airportsObj = response.reduce((acc, airport) => {
                acc[airport.code] = airport;
                return acc;
            }, {});

            FlightStore.update(s => {
                s.airports = airportsObj;
                s.loading = false;
            });
        } catch (error) {
            FlightStore.update(s => {
                s.error = 'Failed to fetch airports';
                s.loading = false;
                s.airports = {};
            });
        }
    }
};
