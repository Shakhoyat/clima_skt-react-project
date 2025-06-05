import type { GeocodingResponse, WeatherData } from "@/apis/types";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Droplet, Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  if (!data) {
    return null; // or return a loading/error state if you prefer
  }

  const {
    weather: [CurrentWeather],
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed, deg },
  } = data;

  const formattedTemp = (temp: number) => {
    return `${Math.round(temp)}°C`;
  };
  return (
    <div>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-end gap-1">
                  <h2 className="text-2xl font-bold tracking-tighter">
                    {locationName?.name || "Unknown Location"}
                  </h2>
                  {locationName?.state && (
                    <span className="text-muted-foreground">
                      , {locationName.state}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {locationName?.country || "Unknown Country"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-7xl font-bold tracking-tighter">
                  {formattedTemp(temp)}
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Feels Like{formattedTemp(feels_like)}
                  </p>
                  <div className="flex gap-2 text-wm font-medium">
                    <span className="flex items-center gap-1 text-blue-500">
                      <ArrowDown className="h-3 w-3" />
                      {formattedTemp(temp_min)}
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <ArrowUp className="h-3 w-3" />
                      {formattedTemp(temp_max)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className=" h-4 w-4 mr-1 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium ">Humidity</p>
                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className=" h-4 w-4 mr-1 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium ">Wind Speed</p>
                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center rounded-lg p-4">
                <img
                  src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`}
                  alt="weather icon"
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
                <div className="absolute bottom-0 text-center">
                  <p className="text-sm font-medium capitalize">
                    {CurrentWeather.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeather;
