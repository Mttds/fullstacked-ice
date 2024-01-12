import weatherService from '../services/weather';
import { useState, useEffect } from 'react';

const kelvinToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
}

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState({ list: [] });
  //const [weatherIcon, setWeatherIcon] = useState('');

  useEffect(() => {
    weatherService.getWeather({ city: country.capital }).then((data) => {
      setWeatherData(data);
    });
    
  }, [country.capital]); // reload weatherData when country.capital changes

  //useEffect(() => {
  //  if (weatherData.list.length > 0) {
  //    const iconCode = weatherData.list[0].weather[0].icon; // Assuming weather is an array
  //    weatherService.getIcon({ iconCode }).then((data) => {
  //      setWeatherIcon(data);
  //    });
  //  }
  //}, [weatherData.list]);

  return (
    <>
      <h2>Weather in {country.capital}</h2>
      {weatherData.list.length > 0 ? (
        <>
          <p>Temperature (K) = {weatherData.list[0].main.temp}</p>
          <p>Temperature (C) = {kelvinToCelsius(weatherData.list[0].main.temp)}</p>
          <p>Wind Speed = {weatherData.list[0].wind.speed} m/s</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`} alt="Weather Icon" />
        </>
      ) : (
        <p>No weather data available</p>
      )}
    </>
  );
};

export default Weather;
