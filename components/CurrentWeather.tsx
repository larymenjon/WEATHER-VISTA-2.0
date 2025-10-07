
import React from 'react';
import { WeatherData } from '../types';
import WeatherIcon from './icons/WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { name, main, weather, sys } = data;
  const weatherInfo = weather[0];

  return (
    <div className="bg-black/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 flex flex-col justify-between items-start h-full">
      <div>
        <h2 className="text-2xl font-bold">{name}, {sys.country}</h2>
        <p className="text-lg text-gray-300 capitalize">{weatherInfo.description}</p>
      </div>
      <div className="flex items-center justify-between w-full mt-4">
        <div className="text-6xl font-bold">
          {Math.round(main.temp)}°C
        </div>
        <div className="w-24 h-24">
          <WeatherIcon iconCode={weatherInfo.icon} />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
