
import { WeatherData, ForecastData } from '../types';

const API_KEY = 'c9336e0d17a7d1573dddf432a0e110fe';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const fetchData = async <T,>(endpoint: string): Promise<T> => {
  const url = `${API_BASE_URL}/${endpoint}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  return fetchData<WeatherData>(`weather?q=${city}`);
};

export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  return fetchData<ForecastData>(`forecast?q=${city}`);
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
    return fetchData<WeatherData>(`weather?lat=${lat}&lon=${lon}`);
};

export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
    return fetchData<ForecastData>(`forecast?lat=${lat}&lon=${lon}`);
};
