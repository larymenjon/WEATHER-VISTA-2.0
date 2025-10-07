
import React from 'react';
import { Sun, Cloud, CloudSun, CloudRain, Zap, Snowflake, Wind } from 'lucide-react';

interface WeatherIconProps {
  iconCode: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode }) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    '01d': <Sun size="100%" color="#FFC700" />,
    '01n': <Sun size="100%" color="#FFC700" />, // Using Sun for clear night for simplicity
    '02d': <CloudSun size="100%" color="#A0AEC0" />,
    '02n': <CloudSun size="100%" color="#A0AEC0" />,
    '03d': <Cloud size="100%" color="#A0AEC0" />,
    '03n': <Cloud size="100%" color="#A0AEC0" />,
    '04d': <Cloud size="100%" color="#718096" />,
    '04n': <Cloud size="100%" color="#718096" />,
    '09d': <CloudRain size="100%" color="#4299E1" />,
    '09n': <CloudRain size="100%" color="#4299E1" />,
    '10d': <CloudRain size="100%" color="#4299E1" />,
    '10n': <CloudRain size="100%" color="#4299E1" />,
    '11d': <Zap size="100%" color="#ECC94B" />,
    '11n': <Zap size="100%" color="#ECC94B" />,
    '13d': <Snowflake size="100%" color="#BEE3F8" />,
    '13n': <Snowflake size="100%" color="#BEE3F8" />,
    '50d': <Wind size="100%" color="#A0AEC0" />,
    '50n': <Wind size="100%" color="#A0AEC0" />,
  };

  return <>{iconMap[iconCode] || <Sun size="100%" color="#FFC700" />}</>;
};

export default WeatherIcon;
