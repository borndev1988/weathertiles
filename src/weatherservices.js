const apiKey = "9af04edca48732aeccdff09b5b7406a3";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (city) => {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${apiKey}&units=metric`);
  if (!response.ok) throw new Error("Stadt nicht gefunden");
  return response.json();
};

export const fetchForecast = async (city) => {
  const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${apiKey}&units=metric`);
  if (!response.ok) throw new Error("Stadt nicht gefunden");
  return response.json();
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  if (!response.ok) throw new Error("Standort nicht gefunden");
  return response.json();
};