import type { ForecastData } from "@/apis/types";
import { format } from "date-fns";

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
  return <div>HII</div>;
};

export default WeatherForecast5days;
