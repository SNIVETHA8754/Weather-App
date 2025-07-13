import axios from 'axios';
import React, { useState } from 'react';

const Weather = () => {
  const [city, setcity] = useState("");
  const [weather, setweather] = useState("");
  const [temp, settemp] = useState("");
  const [desc, setdesc] = useState("");
  const [icon, seticon] = useState("");
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


  function handlecity(eve) {
    setcity(eve.target.value);
  }

  async function getweatherdata() {
    try {
      const geoRes = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      const { lat, lon } = geoRes.data[0];

      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );


      setweather(weatherRes.data.weather[0].main);
      const celsius = (weatherRes.data.main.temp - 273.15).toFixed(2);
      settemp(celsius + " °C");

      setdesc(weatherRes.data.weather[0].description);
      seticon(weatherRes.data.weather[0].icon);

    } catch (error) {
      alert("Couldn't get data. Check the city name.");
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-teal-100 to-cyan-100  flex flex-col items-center justify-center p-4">
      {/* Title with weather image */}
      <div className="flex items-center mb-4">
        <h1 className="text-4xl font-bold text-slate-800">Weather App</h1>
        <img
          src="images/sun.png"
          alt="Weather Icon"
          className="w-12 h-12 ml-3"
        />
      </div>

      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Enter Your City</h2>
            <input
              type="text"
              className="w-full p-3 border border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 text-lg"
              placeholder="e.g. Chennai..."
              onChange={handlecity}
              onKeyPress={(e) => e.key === 'Enter' && getweatherdata()}
            />
          </div>
          <button
            onClick={getweatherdata}
            className="mt-4 bg-emerald-500 text-white py-3 px-6 rounded-lg hover:bg-emerald-600 transition text-lg font-medium shadow-md"
          >
            Get Weather Report
          </button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 underline">Weather Report</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-xl shadow-md w-full">
            {/* Weather Icon - Highlighted */}
            <div className="flex justify-center mb-4">
              {icon ? (
                <div className="bg-white p-3 rounded-full shadow-lg border-2 border-blue-300">
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={desc}
                    className="w-20 h-20 animate-pulse"
                  />
                </div>
              ) : (
                <div className="bg-gray-100 p-3 rounded-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1146/1146869.png"
                    alt="Default Weather"
                    className="w-20 h-20 opacity-50"
                  />
                </div>
              )}
            </div>

            {/* Weather Details */}
            <div className="space-y-3">
              <p className="text-lg font-semibold text-gray-800 flex items-center">
                <span className="mr-2">🌤</span>
                Weather: <span className="text-indigo-700 ml-2">{weather || "N/A"}</span>
              </p>
              <p className="text-lg font-semibold text-gray-800 flex items-center">
                <span className="mr-2">🌡</span>
                Temperature: <span className="text-red-600 ml-2">{temp || "N/A"}</span>
              </p>
              <p className="text-lg font-semibold text-gray-800 flex items-center">
                <span className="mr-2">📋</span>
                Description: <span className="text-green-600 capitalize ml-2">{desc || "N/A"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

