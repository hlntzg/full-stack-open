
import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import SearchCountry from './components/SearchCountry'
import CountriesList from './components/CountriesList'
import DisplayCountry from './components/DisplayCountry'

const App = () => {
  const [countries, setCountries] = useState(null)
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
  
  if (!countries) { 
    return null 
  }
  
  const handleCountryChange = (event) => {
    const value = event.target.value
  
    setSearchCountry(value)

    if (value) {
      const matches = countries.filter(country =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      )

      if (matches.length === 1) {
        //  GET request for selected country 
        countriesService
          .getByCountry(matches[0].name.common)
          .then(countryData => {
            setSelectedCountry(countryData)
            console.log(countryData)
          })
      } else {
        setSelectedCountry(null)
      }
    } else {
      setSelectedCountry(null)
    }
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
            <CountriesList countries={filteredCountries}/>
          )}
          {filteredCountries.length === 1 && (
            <DisplayCountry country={selectedCountry}/>
          )}
        </>
    )}
  </div>
  )
}

export default App