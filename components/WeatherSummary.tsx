
import React from 'react';
import { WeatherData, ForecastData } from '../types';
import { Info } from 'lucide-react';

interface WeatherSummaryProps {
    weather: WeatherData | null;
    forecast: ForecastData | null;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({ weather, forecast }) => {

    const generateSummary = () => {
        if (!weather || !forecast) return '';

        const currentDesc = weather.weather[0].description;
        const todayMax = Math.round(weather.main.temp_max);

        // Find tomorrow's forecast max temperature
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];
        
        const tomorrowForecasts = forecast.list.filter(item => item.dt_txt.startsWith(tomorrowString));
        
        let tomorrowsMax = -Infinity;
        if (tomorrowForecasts.length > 0) {
            tomorrowsMax = Math.round(Math.max(...tomorrowForecasts.map(f => f.main.temp_max)));
        }

        let summary = `Today's forecast: ${currentDesc.charAt(0).toUpperCase() + currentDesc.slice(1)} with a high of ${todayMax}°C.`;

        if (tomorrowsMax !== -Infinity) {
            const diff = tomorrowsMax - todayMax;
            if (diff > 4) {
                summary += ` It will be significantly warmer tomorrow.`;
            } else if (diff < -4) {
                summary += ` Heads up! It's getting colder tomorrow.`;
            }
        }
        return summary;
    }

    const summaryText = generateSummary();

    if (!summaryText) return null;

    return (
        <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/10 flex items-center space-x-3">
            <Info className="text-cyan-400 flex-shrink-0" size={24} />
            <p className="text-sm text-gray-200">{summaryText}</p>
        </div>
    );
};

export default WeatherSummary;
