import type { ForecastData } from "@/apis/types";

interface HourlyTemperatureProps {
  data: ForecastData; // Replace 'any' with the actual type of your hourly temperature data
}
const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  return <div>HourlyTemperature</div>;
};

export default HourlyTemperature;
