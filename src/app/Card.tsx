import React from "react";
import dusk from "./images/duskdawn.png";
import sun from "./images/sunrise sunset.jpg";

interface SunriseSunsetData {
  results: {
    solar_noon: string;
    day_length: number;
    timezone: string;
    sunrise: string;
    sunset: string;
    dawn: string;
    dusk: string;
  };
}

interface CardProps {
  sunriseSunsetData: SunriseSunsetData | null;
  tomorrowData: string;
  countryname: string | null;
  sunriseSunsetDatastat: React.Dispatch<
    React.SetStateAction<SunriseSunsetData | null>
  >;
}

export function Card({
  sunriseSunsetData,
  countryname,
  sunriseSunsetDatastat,
}: CardProps): JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {countryname ? (
          <h3 className="text-2xl font-bold mb-4">{countryname}</h3>
        ) : (
          <h3 className="text-2xl font-bold mb-4">Results Found</h3>
        )}
        <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">Today</h2>
          <div className="flex justify-between mb-6">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">
                Additional Information
              </h3>
              <p className="text-gray-400">
                Solar Noon: {sunriseSunsetData?.results.solar_noon}
              </p>
              <p className="text-gray-400">
                Day Length: {sunriseSunsetData?.results.day_length} seconds
              </p>
              <p className="text-gray-400">
                Time Zone: {sunriseSunsetData?.results.timezone}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-800 rounded-lg p-5 shadow-md text-white mr-4">
              <div className="mb-4">
                <img src={sun.src} alt="Sunrise icon" className="w-20 h-20" />
              </div>
              <h2 className="text-lg font-semibold mb-2 text-gray-300">
                Sunrise and Sunset
              </h2>
              <p className="text-gray-400">
                Sunrise: {sunriseSunsetData?.results.sunrise}
              </p>
              <p className="text-gray-400">
                Sunset: {sunriseSunsetData?.results.sunset}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-5 shadow-md text-white">
              <div className="mb-4">
                <img src={dusk.src} alt="Dawn icon" className="w-20 h-20" />
              </div>
              <h2 className="text-lg font-semibold mb-2 text-gray-300">
                Dawn and Dusk
              </h2>
              <p className="text-gray-400">
                Dawn: {sunriseSunsetData?.results.dawn}
              </p>
              <p className="text-gray-400">
                Dusk: {sunriseSunsetData?.results.dusk}
              </p>
            </div>
          </div>
          <button
            onClick={() => sunriseSunsetDatastat(null)}
            className="bg-gray-600 text-white p-3 mt-5 border-none cursor-pointer rounded transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

