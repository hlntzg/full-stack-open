const DisplayCountry = ({ country }) => {
  if (!country) return null

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
        src={country.flags.png} alt={`Flag of ${country.name.common}`}  
      />
    </div>
  )
}
export default DisplayCountry