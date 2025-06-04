export interface Coordinates{
    lat: number;
    lon: number;
}
export interface WeatherCondn{
    id: number;
    main: string;
    description: string;
    icon: string;
}
export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondn[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
export interface ForecastData {
    list: WeatherData[];
    city: {
        id: number;
        name: string;
        coord: Coordinates;
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}
export interface GeocodingResponse{
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}