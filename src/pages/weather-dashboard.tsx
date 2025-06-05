import WeatherSkeliton from "@/components/loading-skeliton";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import { AlertTriangle, MapPin, RefreshCcw, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherDetails from "@/components/weather-details";
const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();
  // console.log("Coordinates:", coordinates);

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };
  if (locationLoading) {
    return <WeatherSkeliton />;
  }
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error!</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
          <Button variant="outline" className="w-fit" onClick={getLocation}>
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Not Found</AlertTitle>
        <AlertDescription>
          <p>
            Unable to retrieve your location. Please enable location services
            and try again.
          </p>
          <Button variant="outline" className="w-fit" onClick={getLocation}>
            <MapPin className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0] || "Unknown Location";
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription>
          <p>
            {weatherQuery.error?.message ||
              forecastQuery.error?.message ||
              "An error occurred while fetching weather data."}
          </p>
          <Button variant="outline" className="w-fit" onClick={handleRefresh}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeliton />;
  }

  return (
    <div className="p-4 space-y-4">
      {/* Fav cities */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching} // Disable button for now
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={
              locationQuery.data && locationQuery.data.length > 0
                ? locationQuery.data[0]
                : undefined
            }
          />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div>
          <WeatherDetails data={forecastQuery.data} />
          {/* forecast */}
        </div>
      </div>
      {/* current and hourly weather    */}
    </div>
  );
};

export default WeatherDashboard;
