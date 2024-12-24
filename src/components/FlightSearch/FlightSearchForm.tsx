import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plane } from "lucide-react";
import { useState } from 'react';
import AirportSearch from './AirportSearch';

type Airport = {
  code: string;
  name: string;
  city: string;
  country: string;
}

const FlightSearchForm = () => {
  const [origin, setOrigin] = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <Tabs defaultValue="oneWay" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="oneWay">One Way</TabsTrigger>
          <TabsTrigger value="roundTrip">Round Trip</TabsTrigger>
          <TabsTrigger value="multiCity">Multi City</TabsTrigger>
        </TabsList>

        <TabsContent value="oneWay">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AirportSearch
              label="From"
              value={origin}
              onChange={setOrigin}
            />
            <AirportSearch
              label="To"
              value={destination}
              onChange={setDestination}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Departure</label>
              <div className="relative">
                <Input 
                  type="date"
                  className="pl-10"
                />
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Search Flights
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roundTrip">
          {/* We'll implement this next */}
        </TabsContent>

        <TabsContent value="multiCity">
          {/* We'll implement this next */}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default FlightSearchForm;