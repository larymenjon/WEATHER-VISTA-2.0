
import React from 'react';
import { WeatherData, ForecastData } from '../types';
import { Thermometer, Wind, Droplets, CloudRain } from 'lucide-react';

interface WeatherDetailsProps {
  data: WeatherData;
  forecast: ForecastData;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number; unit: string }> = ({ icon, label, value, unit }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <div className="text-cyan-400">{icon}</div>
            <p className="text-sm text-gray-300">{label}</p>
        </div>
        <p className="font-bold text-lg">{value} <span className="text-sm font-normal">{unit}</span></p>
    </div>
);

const ProgressBarDetail: React.FC<{ icon: React.ReactNode; label: string; value: number; unit: string; percentage: number }> = ({ icon, label, value, unit, percentage }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-2">
                <div className="text-cyan-400">{icon}</div>
                <span className="text-sm text-gray-300">{label}</span>
            </div>
            <span className="font-bold text-base">{value}{unit}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2.5">
            <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data, forecast }) => {
  const { main, wind } = data;
  const precipitationChance = forecast ? Math.round(forecast.list[0].pop * 100) : 0;
  const windSpeedKmh = Math.round(wind.speed * 3.6);
  const windSpeedPercentage = Math.min((windSpeedKmh / 100) * 100, 100);

  return (
    <div className="bg-black/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 h-full flex flex-col justify-between">
      <h3 className="text-lg font-semibold mb-4">Weather Details</h3>
      <div className="space-y-4">
        <DetailItem icon={<Thermometer size={24} />} label="Min Temp" value={Math.round(main.temp_min)} unit="°C" />
        <DetailItem icon={<Thermometer size={24} />} label="Max Temp" value={Math.round(main.temp_max)} unit="°C" />
        <ProgressBarDetail icon={<Droplets size={20} />} label="Humidity" value={main.humidity} unit="%" percentage={main.humidity} />
        <ProgressBarDetail icon={<Wind size={20} />} label="Wind Speed" value={windSpeedKmh} unit=" km/h" percentage={windSpeedPercentage} />
        <ProgressBarDetail icon={<CloudRain size={20} />} label="Precipitation" value={precipitationChance} unit="%" percentage={precipitationChance} />
      </div>
    </div>
  );
};

export default WeatherDetails;