import { useState, useEffect } from "react"
import weatherService from "../services/weather"

const DisplayCountry = ({ country }) => {
  const [cityWeather, setCityWeather] = useState(null)

  useEffect(() => {
    if (country.capital) {
      weatherService
        .getByCity(country.capital, country.cca2)
        .then(data => {
          console.log(data)
          setCityWeather(data)
          console.log(data.weather[0].icon)
      })    
    }
  }, [country.capital])

  // country.languages from the API is an object with key-value pairs
  const languages = Object.values(country.languages)  

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img 
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}  
      />
      <h2>Weather in {country.capital}</h2>
      {cityWeather && (
        <div>
          <div>Temperature: {cityWeather.main.temp} Celsius</div>
          <div>Wind: {cityWeather.wind.speed} m/s</div>
          <img 
            src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
            alt={cityWeather.weather[0].description} />
        </div>
      )}
    </div>
  )
}
export default DisplayCountry