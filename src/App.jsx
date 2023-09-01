import React, { useState, useEffect } from 'react';
import Globe from './Globe';

import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const url = `https://weather-api99.p.rapidapi.com/weather?city=${city}`
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9a53571b55mshd43ce905ba54be5p17374ejsn8d9e3be03c88',
      'X-RapidAPI-Host': 'weather-api99.p.rapidapi.com'
    }
  };
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        url,options
      );
      const data = await response.json();
      setWeatherData(data);
      setCity('')
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };
  

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {weatherData && (
        <div className="weather-container">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    {weatherData !== null && (
      <Globe selectedCity={city} weatherData={weatherData}/>
    )}
    </div>

  );
}
//'9a53571b55mshd43ce905ba54be5p17374ejsn8d9e3be03c88'

export default App;
