const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const CountryView = ({country}) => {
  return (
    <>
      <h2>{capitalize(country.name.common)}</h2>
      <p>Capital = {country.capital}</p>
      <p>Area = {country.area}</p>
      <b>Languages:</b>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>
            {value}
          </li>
        ))}
      </ul>
      <img width="400" height="400" alt="Country Flag" src={country.flags.svg}></img>
    </>
  )
}

export default CountryView
