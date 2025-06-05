import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import { RefreshCcw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();
  console.log("Coordinates:", coordinates);
  const handleRefresh = () => {
    getLocation();
    if (!coordinates) {
      // console.error("No coordinates available to refresh weather data.");
      return;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Fav cities */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          // onClick={handleRefresh}
          // disabled={true} // Disable button for now
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      {/* current and hourly weather    */}
    </div>
  );
};

export default WeatherDashboard;
