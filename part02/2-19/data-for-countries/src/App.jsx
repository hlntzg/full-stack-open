
import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import SearchCountry from './components/SearchCountry'
import DisplayCountry from './components/DisplayCountry'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    //  GET request 
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        console.log(initialCountries)
      })
  }, [])
  
  const handleCountryChange = (event) => {
    setSearchCountry(event.target.value)
    setSelectedCountry(null) // reset selection if typing again
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  )

  return (
    <div>
      <h1>Data for Countries</h1>
      <SearchCountry
        searchCountry={searchCountry}
        handleSearchCountry={handleCountryChange}
      />
      {searchCountry && (
        <>
          {filteredCountries.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}
          {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
            <div>
              {filteredCountries.map(country => (
                <div key={country.name.common}>
                  {country.name.common}
                  <button 
                    onClick={() => {setSelectedCountry(country)}}>
                    Show
                  </button>
                </div>
              ))}
            </div>
          )}
          {filteredCountries.length === 1 && (
            <DisplayCountry country={filteredCountries[0]}/>
          )}
          {selectedCountry && (
            <DisplayCountry country={selectedCountry} />
          )}
        </>
    )}
  </div>
  )
}

export default App