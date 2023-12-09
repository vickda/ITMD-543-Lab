// SunriseSunsetDashboard.js
'use client';
import { BrowserRouter as Router, Route, Switch, Navigate, Link } from 'react-router-dom';
import Card from '../app/Card/page'; 
import React, {useState} from 'react';

const SunriseSunsetDashboard = () => {
  const [location, setLocation] = useState('');
  const [sunriseSunsetData, setSunriseSunsetData] = useState(null);
  const [tomorrowData, setTomorrowData] = useState(null);
  const [countryName, setCountryName] = useState('');

  const getSunriseSunset = async () => {
    try {
      if (!location) {
        alert('Please enter a valid location.');
        return;
      }

      const geocodeResponse = await fetch(`https://geocode.maps.co/search?q=${location}`);
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.length > 0) {
        const nearestData = geocodeData[0];
        const { lat, lon, display_name } = nearestData;
        setCountryName(display_name);

        const sunriseSunsetResponse = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&formatted=0`);
        const sunriseSunsetData = await sunriseSunsetResponse.json();

        const todayData = sunriseSunsetData.results.sunrise.split("T")[0];
        const tomorrowData = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];

        setSunriseSunsetData(sunriseSunsetData);
        setTomorrowData(tomorrowData);

        // Navigate to the "/card" route

        console.log(sunriseSunsetData, tomorrowData);

        return <Card sunriseSunsetData={sunriseSunsetData} tomorrowData={tomorrowData} countryname={countryName} />
      } else {
        throw new Error('Location not found.');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };



  return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Sunrise Sunset Dashboard</title>
        </head>
        
        <body className="font-sans m-0 p-0 box-border bg-gray-100 text-gray-800 flex flex-col items-center justify-center min-h-screen">

  {sunriseSunsetData ? (
    <Card sunriseSunsetData={sunriseSunsetData} tomorrowData={tomorrowData} countryname={countryName} sunriseSunsetDatastat={setSunriseSunsetData} />
  ) : (
    <div className="p-5 flex flex-col items-center">
      <header className="bg-gray-800 p-5 text-center text-white mb-8">
        <h1 className="text-2xl font-bold">Sunrise Sunset Dashboard ITMD 543 Vicky Das</h1>
      </header>
      <div id="location-form" className="flex flex-wrap justify-center items-center mb-8">
        <label htmlFor="location-input" className="mr-3 text-gray-600">Enter Location:</label>
        <input
          type="text"
          id="location-input"
          placeholder="City, Country"
          className="p-3 border border-gray-300 bg-white text-gray-800 rounded transition duration-300 flex-1"
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          onClick={() => getSunriseSunset()}
          className="bg-gray-600 text-white p-3 mr-3 ml-3 border-none cursor-pointer rounded transition duration-300"
        >
          Search
        </button>
      </div>

      <footer className="bg-gray-800 p-4 text-center fixed bottom-0 w-full text-white">
        <p>
          Powered by{' '}
          <a className="text-blue-500" href="https://sunrisesunset.io/api/" target="_blank" rel="noopener noreferrer">
            Sunrise Sunset API
          </a>
        </p>
      </footer>
    </div>
  )}

</body>

      </html>

        

    //     <Route path="/card" element={<Card sunriseSunsetData={sunriseSunsetData} tomorrowData={tomorrowData} countryname={countryName} />} />
    //   </Switch>

    // </Router>
  );
};

export default SunriseSunsetDashboard;
