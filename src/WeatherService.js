// @flow

import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "ff1291e85355d8308bff11af8808a0f2";

function getCurrentWeatherEndpoint(query: string) {
  return `${BASE_URL}weather?q=${query}` + `&appid=${API_KEY}&lang=ja`;
}

function getCurrentWeather(city: string): Promise<CurrentWeather> {
  const endpoint = getCurrentWeatherEndpoint(city);
  return fetch(endpoint)
    .then(response => response.json())
    .then(json => new CurrentWeather(json));
}

// function getWeatherForecastEndpoint(city: *) {
//   const { en, latitude, longitude } = city;
//   if (latitude && longitude) {
//     return (
//       `${BASE_URL}forecast` +
//       `?lat=${latitude}&lon=${longitude}` +
//       `&appid=${API_KEY}&lang=ja`
//     );
//   }
//   return `${BASE_URL}forecast?q=${en}&appid=${API_KEY}&lang=ja`;
// }

// function getWeatherForecast(city: *): Promise<WeatherForecast[]> {
//   const endpoint = getWeatherForecastEndpoint(city);
//   console.log(endpoint);
//   return fetch(endpoint)
//     .then(response => response.json())
//     .then(json => json.list.map(item => new WeatherForecast(item)));
// }

function getWeatherForecastEndpoint(city: string) {
  return `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&lang=ja`;
}

function getWeatherForecast(city: string): Promise<WeatherForecast[]> {
  const endpoint = getWeatherForecastEndpoint(city);
  console.log(endpoint);
  return fetch(endpoint)
    .then(response => response.json())
    .then(json => json.list.map(item => new WeatherForecast(item)));
}

export { getCurrentWeather, getWeatherForecast };
