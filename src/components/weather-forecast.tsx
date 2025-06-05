import type { ForecastData } from "@/apis/types";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
interface WeatherForecast5daysProps {
  data: ForecastData;
}
interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}
const WeatherForecast5days = ({ data }: WeatherForecast5daysProps) => {
  const dailyForecasts = data.list.reduce((acc, item) => {
    const date = format(new Date(item.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        humidity: item.main.humidity,
        weather: item.weather[0],
        wind: item.wind.speed,
        date: item.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
      acc[date].humidity = Math.max(acc[date].humidity, item.main.humidity);
      acc[date].wind = Math.max(acc[date].wind, item.wind.speed);
      acc[date].weather = item.weather[0]; // Assuming you want the last weather condition
    }
    return acc;
  }, {} as Record<string, DailyForecast>);
  //   console.log(dailyForecasts);
  const nextDays = Object.values(dailyForecasts).slice(0, 6);
  function formatTemp(temp: number): React.ReactNode {
    return `${Math.round(temp)}°C`;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {nextDays.map((day) => {
            return (
              <div
                key={day.date}
                className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">
                    {format(new Date(day.date * 1000), "EEE, MMM d")}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {day.weather.description}
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <span className="flex items-center text-blue-600">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-600">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>

                <div className="flex justify-end gap-4">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.wind} m/s</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast5days;
