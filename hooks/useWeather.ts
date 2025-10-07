
import { useState, useEffect, useCallback } from 'react';
import { WeatherData, ForecastData } from '../types';
import { getWeatherByCity, getForecastByCity, getWeatherByCoords, getForecastByCoords } from '../services/weatherService';

export const useWeather = (defaultCity: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (fetchFn: () => Promise<[WeatherData, ForecastData]>) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await fetchFn();
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCity = useCallback((city: string) => {
    setGeolocationError(null); // Clear geolocation error on manual search
    const fetchFn = () => Promise.all([getWeatherByCity(city), getForecastByCity(city)]);
    fetchWeatherData(fetchFn);
  }, [fetchWeatherData]);
  
  const fetchWeatherByCoords = useCallback((lat: number, lon: number) => {
    const fetchFn = () => Promise.all([getWeatherByCoords(lat, lon), getForecastByCoords(lat, lon)]);
    fetchWeatherData(fetchFn);
  }, [fetchWeatherData]);

  useEffect(() => {
    const fetchDefaultCity = () => {
        const fetchFn = () => Promise.all([getWeatherByCity(defaultCity), getForecastByCity(defaultCity)]);
        fetchWeatherData(fetchFn);
    }
      
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          let message = 'Could not retrieve your location. Showing weather for the default city.';
          if (err.code === err.PERMISSION_DENIED) {
            message = 'Geolocation permission denied. Please enable it in your browser settings. Showing weather for the default city.';
          } else if (err.message.includes('permissions policy')) {
            message = 'Geolocation is disabled by browser policy. Showing weather for the default city.'
          }
          setGeolocationError(message);
          fetchDefaultCity();
        }
      );
    } else {
        setGeolocationError('Geolocation is not supported by your browser. Showing weather for the default city.');
        fetchDefaultCity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on initial mount

  return { weather, forecast, loading, error, geolocationError, fetchWeatherByCity };
};
