import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FlightSearchForm = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <Tabs defaultValue="oneWay" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="oneWay">One Way</TabsTrigger>
          <TabsTrigger value="roundTrip">Round Trip</TabsTrigger>
          <TabsTrigger value="multiCity">Multi City</TabsTrigger>
        </TabsList>

        <TabsContent value="oneWay">
          {/* One Way search form content */}
          <div className="grid grid-cols-2 gap-4">
            {/* We'll add the from/to inputs here */}
          </div>
        </TabsContent>

        {/* We'll add other tab contents later */}
      </Tabs>
    </Card>
  );
};

export default FlightSearchForm;