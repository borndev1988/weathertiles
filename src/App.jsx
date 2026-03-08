import { useState } from 'react'
import './App.css'

function App() {
  const [cityName, setCityName] = useState("")
  const [weatherData, setWeatherData] = useState(null)

  const handleCityNameInput = (e) => {
    setCityName(e.target.value)
  }

  const fetchOpenWeatherApi = () => {
    const apiKey = "9af04edca48732aeccdff09b5b7406a3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(responseResult => setWeatherData(responseResult) )
    .catch(err => console.error("API Fehler:", err))
  }

  return (
    <div>
      <div>QuickWeather</div>
      <input
        type='text'
        placeholder='Stadtname'
        onChange={handleCityNameInput}
      />
      <button onClick={fetchOpenWeatherApi}>Suchen</button>

      <div>
        {weatherData && <h1>{weatherData.name}</h1>}
        <p>{Math.round(weatherData?.main.temp)}°C</p>
        <p>{Math.round(weatherData?.main.feels_like)}°C gefühlte Temperatur</p>
        
      </div>
    </div>
  )
}

export default App