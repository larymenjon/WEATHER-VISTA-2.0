
import React from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import Forecast from './components/Forecast';
import WeatherChart from './components/WeatherChart';
import AnimatedBackground from './components/AnimatedBackground';
import Logo from './components/icons/Logo';
import WeatherSummary from './components/WeatherSummary';

const App: React.FC = () => {
  const { weather, forecast, loading, error, geolocationError, fetchWeatherByCity } = useWeather('New York');

  const handleSearch = (city: string) => {
    fetchWeatherByCity(city);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatedBackground weatherCondition={weather?.weather[0]?.main || 'Clear'} />
      <main className="relative z-10 flex flex-col items-center p-4 sm:p-6 md:p-8 text-white">
        <div className="w-full max-w-4xl space-y-6">
          <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Logo className="w-12 h-12" />
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-shadow">
                Weather<span className="text-cyan-400">Vista</span>
              </h1>
            </div>
            <SearchBar onSearch={handleSearch} />
          </header>

          {geolocationError && (
            <div className="text-center p-3 bg-yellow-500/50 rounded-lg backdrop-blur-sm border border-yellow-500/60 text-sm">
              <p>{geolocationError}</p>
            </div>
          )}

          {weather && forecast && !loading && !error && (
            <WeatherSummary weather={weather} forecast={forecast} />
          )}

          {loading && (
             <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
          )}

          {error && !geolocationError && (
            <div className="text-center p-4 bg-red-500/50 rounded-lg backdrop-blur-sm border border-red-500/60">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {weather && forecast && !loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CurrentWeather data={weather} />
                  <WeatherDetails data={weather} forecast={forecast} />
              </div>
              <div className="md:col-span-3">
                  <WeatherChart data={forecast.list} />
              </div>
              <div className="md:col-span-3">
                  <Forecast data={forecast.list} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;