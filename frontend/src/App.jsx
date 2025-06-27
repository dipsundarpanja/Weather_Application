import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import "./App.css";
import Search from "./components/Search";
import Current from "./components/current_weather/Current";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Forecast from "./components/forecast/Forecast";


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async ([weatherRes, forecastRes]) => {
        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();

        setCurrentWeather({ city: searchData.label, ...weatherData });
        setForecast({ city: searchData.label, ...forecastData });

        console.log(weatherData);
        console.log(forecastData);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <Current data={currentWeather} />}{" "}
      {/* Pass the prop */}
      {/* You can add a Forecast component here similarly */}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
