import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const getByCity = (city, countryCode) => {
  const request = axios.get(`${baseUrl}?q=${city},${countryCode}&appid=${apiKey}`)
  return request.then(response => response.data)
}

export default { getByCity }