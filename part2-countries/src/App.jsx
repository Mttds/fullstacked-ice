import { useState, useEffect } from 'react'
import './App.css'
import countriesService from './services/countries'
import SearchFilter from './components/SearchFilter'
import Country from './components/Countries'

const MAX_COUNTRIES = 10; // max countries to show

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    countriesService.getAll().then((data) => {
      if (Array.isArray(data)) {
        setCountries(data);
      } else {
        console.error('Invalid data received:', data);
      }
    })
  }, [])

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }

  const matchedCountries = searchFilter === ""
    ? countries
    : countries.filter((country) => (country.name.common).toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    <div>
      <SearchFilter text="Find Countries" value={searchFilter} onChangeFunction={handleSearchFilterChange} />
      {matchedCountries.length <= MAX_COUNTRIES ? (
        <Country countries={matchedCountries} />
      ) : (
        searchFilter === "" ? (
          <p>Search for a country.</p>
        ) : (
          <p>Too many matches. Specify another search criteria.</p>
        )
      )}
    </div>
  );
}

export default App
