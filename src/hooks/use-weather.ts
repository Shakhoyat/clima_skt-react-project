import type { Coordinates } from "@/apis/types";
import { weatherAPI } from "@/apis/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates | null) => ["weather", coords] as const,
  forecast: (coords: Coordinates | null) => ["forecast", coords] as const,
  reverse: (coords: Coordinates | null) => ["reverse", coords] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }), // Default to a dummy coordinate if null
    queryFn: async () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates, // Only run the query if coordinates are available
  });
}
export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }), // Default to a dummy coordinate if null
    queryFn: async () =>
      coordinates ? weatherAPI.getForecast(coordinates) : null,
    enabled: !!coordinates, // Only run the query if coordinates are available
  });
}
export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.reverse(coordinates ?? { lat: 0, lon: 0 }), // Default to a dummy coordinate if null
    queryFn: async () =>
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates, // Only run the query if coordinates are available
  });
}
