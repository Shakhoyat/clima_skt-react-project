import type { WeatherData } from "@/apis/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}
const formatTime = (timestamp: number) => {
  return format(new Date(timestamp * 1000), "hh:mm a");
};
const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  if (!data || !data.sys || !data.main || !data.wind) {
    return null; // or a loading/error state
  }
  const { main, wind, sys, weather } = data;

  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return directions[index];
  };
  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-orange-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Weather Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => {
            return (
              <div>
                <detail.icon />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
