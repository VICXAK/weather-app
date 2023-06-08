import "./App.css";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const weatherData = async (event) => {
    if (event.key === "Enter") {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a8a386a28a314b892ed2da8253520f51`
      );

      const data = await response.json();
      setLocation("");
      setData(data);
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={weatherData}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main !== undefined && (
              <h1>
                {data.main
                  ? (data.main.temp - 273).toPrecision(2) + "°С"
                  : null}
              </h1>
            )}
          </div>
          <div className="description">
            <p>{data.weather ? data.weather[0].description : null}</p>
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main ? (data.main.feels_like - 273).toPrecision(2) : null}{" "}
                °C
              </p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main ? data.main.humidity : null} %</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.wind ? (data.wind.speed * 1.609).toPrecision(1) : null}{" "}
                km/h
              </p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
