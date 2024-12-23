import FlightSearchForm from "@/components/FlightSearch/FlightSearchForm";


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center" 
           style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 pt-20">
       
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-8">
            Find Your Perfect Flight
          </h1>
          <FlightSearchForm />
        </div>
      </div>
    </div>
  );
};

export default Home; 