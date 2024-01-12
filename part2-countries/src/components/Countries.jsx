import { useState } from 'react'
import CountryView from './CountryView'
import Weather from './Weather'

const Countries = ({countries}) => {
  const [showCountry, setShowCountry] = useState({})

  const showCountryView = (country) => {
    setShowCountry(country)
  }

  if (countries.length === 1) {
    const country = countries[0]
    return (
      <>
        <CountryView country={country} />
        <Weather country={country} />
      </>
    )
  } else {
    return (
      <>
        <ul>
        {countries.map((country, id) => (
          <li key={id}>
            {country.name.common} <button onClick={() => showCountryView(country)}>Show</button>
          </li>
        ))}
        </ul>
        {Object.keys(showCountry).length !== 0 && (
          <>
            <CountryView
              country={countries.find(
                (country) => country.name.common === showCountry.name.common
              )}
            />
            <Weather country={countries.find(
              (country) => country.name.common === showCountry.name.common
            )} />
          </>
        )}
      </>
      
    )
  }
}

export default Countries
