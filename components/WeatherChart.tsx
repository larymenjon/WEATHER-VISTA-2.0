
import React from 'react';
import { ForecastListItem } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface WeatherChartProps {
  data: ForecastListItem[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/50 backdrop-blur-sm p-3 rounded-lg border border-white/20">
        <p className="label text-sm text-gray-200">{`Time: ${label}`}</p>
        <p className="intro text-cyan-400">{`Temp: ${payload[0].value}°C`}</p>
        <p className="intro text-amber-400">{`Wind: ${payload[1].value} km/h`}</p>
      </div>
    );
  }
  return null;
};

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const chartData = data.slice(0, 9).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    temperature: Math.round(item.main.temp),
    windSpeed: Math.round(item.wind.speed * 3.6), // m/s to km/h
  }));

  return (
    <div className="bg-black/20 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold mb-4">Next 24 Hours</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.7)" fontSize={12} />
            <YAxis yAxisId="left" stroke="rgba(255, 255, 255, 0.7)" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="rgba(255, 255, 255, 0.7)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "14px"}} />
            <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
            <Line yAxisId="right" type="monotone" dataKey="windSpeed" name="Wind (km/h)" stroke="#fbbf04" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherChart;
