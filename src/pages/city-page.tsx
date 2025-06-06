import { useParams, useSearchParams } from "react-router-dom";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import WeatherSkeliton from "@/components/loading-skeliton";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast5days from "@/components/weather-forecast";
const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription>
          Failed to fetch weather data ...Please try again later!!!
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeliton />;
  }
  return (
    <div className="p-4 space-y-4">
      {/* Fav cities */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold tracking-tight">
          {params.cityName},{weatherQuery.data.sys.country}
        </h1>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast5days data={forecastQuery.data} />
        </div>
      </div>
      {/* current and hourly weather    */}
    </div>
  );
};

export default CityPage;
