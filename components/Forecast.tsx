
import React from 'react';
import { ForecastListItem } from '../types';
import WeatherIcon from './icons/WeatherIcon';

interface ForecastProps {
  data: ForecastListItem[];
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  const getDailyForecasts = (list: ForecastListItem[]) => {
    const dailyData: { [key: string]: ForecastListItem } = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = item;
      }
    });

    return Object.values(dailyData).slice(1, 6); // Get next 5 days
  };

  const dailyForecasts = getDailyForecasts(data);

  return (
    <div className="bg-black/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {dailyForecasts.map((day) => (
          <div key={day.dt} className="flex flex-col items-center p-3 bg-white/10 rounded-lg">
            <p className="font-semibold text-sm">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <div className="w-12 h-12 my-1">
              <WeatherIcon iconCode={day.weather[0].icon} />
            </div>
            <p className="font-bold">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
