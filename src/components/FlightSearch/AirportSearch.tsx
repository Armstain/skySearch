import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Plane } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FlightStore, flightStoreActions } from "@/store/flightStore";
import { debounce } from "lodash";

type Airport = {
  code: string;
  airport_name: string;
  city_name: string;
  country_name: string;
  city_code: string;
  priority: string;
  search_contents: string;
};

interface AirportSearchProps {
  label: string;
  value: Airport | null;
  onChange: (airport: Airport | null) => void;
}

const AirportSearch = ({ label, value, onChange }: AirportSearchProps) => {
  const [open, setOpen] = useState(false); // Tracks whether the popover is open
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // Accessing state from FlightStore
  const { airports = {}, loading } = FlightStore.useState((s) => ({
    airports: s.airports as Record<string, Airport>,
    loading: s.loading,
  }));

  // Fetch airports only once if not already fetched
  useEffect(() => {
    if (Object.keys(airports).length === 0 && !loading) {
      flightStoreActions.fetchAirports();
    }
  }, [airports, loading]);

  // Debounce the input value to optimize filtering performance
  useEffect(() => {
    const handler = debounce(() => setDebouncedValue(inputValue), 150);
    handler();
    return () => handler.cancel();
  }, [inputValue]);

  // Filter airports based on the debounced input value
  const filteredAirports = useMemo(() => {
  if (!debouncedValue || debouncedValue.length < 2) return [];
  
  const searchTerm = debouncedValue.toLowerCase();
  return Object.values(airports).filter((airport) => {
    if (!airport) return false;

    const airportName = airport.airport_name?.toLowerCase() || "";
    const cityName = airport.city_name?.toLowerCase() || "";
    const code = airport.code?.toLowerCase() || "";

    return (
      airportName.includes(searchTerm) ||
      cityName.includes(searchTerm) ||
      code.includes(searchTerm)
    );
  });
}, [debouncedValue, airports]);


  // Handle input value changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (newValue.length >= 2) setOpen(true); // Open the popover only after sufficient input
    else setOpen(false); // Close if input length is insufficient
  };

  // Synchronize the selected value with the input field
  useEffect(() => {
    if (value) {
      setInputValue(`${value.city_name} (${value.code})`);
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <Input
          value={value ? `${value.city_name} (${value.code})` : inputValue}
          onChange={handleInputChange}
          placeholder="Search airports..."
          className="pl-10"
          onClick={() => {
            if (value) {
              setInputValue("");
              setDebouncedValue("");
              onChange(null);
            }
          }}
        />
        <Plane className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        
        {/* Separate dropdown that shows when there's input */}
        {inputValue.length >= 2 && (
          <div className="absolute top-full left-0 right-0 w-[300px] mt-1 bg-white border rounded-md shadow-lg z-50">
            <Command>
              <CommandList>
                <CommandEmpty>
                  {loading ? (
                    "Loading airports..."
                  ) : debouncedValue.length < 2 ? (
                    "Type at least 2 characters to search"
                  ) : (
                    "No airports found"
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {filteredAirports.map((airport) => (
                    <CommandItem
                      key={airport.code}
                      onSelect={() => {
                        onChange(airport);
                        setInputValue("");
                        setDebouncedValue("");
                      }}
                    >
                      <div className="flex flex-col">
                        <span>{airport.city_name} ({airport.code})</span>
                        <span className="text-sm text-gray-500">{airport.airport_name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirportSearch;

