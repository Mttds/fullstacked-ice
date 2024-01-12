import axios from 'axios';

const baseUrl = "https://studies.cs.helsinki.fi/restcountries";

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    });
}

const getCountry = ({name}) => {
  const request = axios.get(`${baseUrl}/api/name/${name}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

export default {
  getAll: getAll,
  getCountry: getCountry,
};
