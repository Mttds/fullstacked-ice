import axios from "axios"

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const baseUrl = "http://api.openweathermap.org/data/2.5/forecast"
const iconUrl = "https://openweathermap.org/img/wn"

const getWeather = ({city}) => {
  const request = axios.get(`${baseUrl}?q=${city}&appid=${API_KEY}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

const getIcon = ({iconCode}) => {
  const request = axios.get(`${iconUrl}/${iconCode}@2x.png`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

export default {
  getWeather: getWeather,
  getIcon: getIcon,
}
