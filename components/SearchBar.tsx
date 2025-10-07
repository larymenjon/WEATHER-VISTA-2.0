
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        className="w-full px-4 py-2 text-white bg-black/30 border border-white/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-r-lg transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
