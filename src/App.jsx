import { useState } from 'react'
import './App.css'
import { icons, getClothingIcon } from './icons.js'

function App() {
  const [cityName, setCityName] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const [error, setError] = useState(null)

  const handleCityNameInput = (e) => {
    setCityName(e.target.value)
  }

  const weatherIcons = {
    Clear: icons.sun,
    Clouds: icons.clouds,
    Rain: icons.rain
  }

  const fetchOpenWeatherApi = () => {
    const apiKey = "9af04edca48732aeccdff09b5b7406a3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    
    setError(null);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Stadt nicht gefunden");
        }
        return response.json();
      })
      .then(responseResult => {
        setWeatherData(responseResult);
        setCityName(""); 
      })
      .catch(err => {
        setWeatherData(null);
        setError(err.message);
      });
  }

  return (
    <div className="main-wrapper">
      <img className='app-logo' src={icons.logo} alt="App Logo" />
      
      <div className="input-group">
        <input
          type='text'
          placeholder='Stadtname'
          value={cityName}
          onChange={handleCityNameInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchOpenWeatherApi();
            }
          }}
        />
        <button onClick={fetchOpenWeatherApi}>Suchen</button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className='weather-container'>
        {weatherData?.main && (
          <>
            <div className='tile'>
              <img
                onClick={() => { weatherData.weather[0].main === "Clear" && alert("Pack deine Sonnenbrille ein!") }}
                src={weatherIcons[weatherData.weather[0].main]}
                alt="Wetter"
              />
              <p>{weatherData.weather[0].main}</p>
            </div>

            <div className='tile'>
              <img src={icons.wind} alt="Wind" />
              <p>{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</p>
            </div>

            <div className='tile'>
              <img
                src={getClothingIcon(weatherData.main.temp)}
                className='weather-icon'
                alt="Empfehlung"
              />
              <p>Outfit</p>
            </div>

            <div
              className="tile"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span style={{ fontWeight: 'bold' }}>
                {isHovering ? "Gefühlt" : "Temperatur"}
              </span>
              <p>
                {isHovering
                  ? `${Math.round(weatherData.main.feels_like)}°C`
                  : `${Math.round(weatherData.main.temp)}°C`
                }
              </p>
            </div>
          </>
        )}
      </div>
      <p className="footer-text">&copy; {new Date().getFullYear()} QuickWeather</p>
    </div>
  )
}

export default App