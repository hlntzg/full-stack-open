const SearchCountry = ({ searchCountry, handleSearchCountry }) => {
    return (
        <div>
          filter shown with 
          <input
            type="text"
            value={searchCountry}
            onChange={handleSearchCountry}
          />
        </div>
    )
}

export default SearchCountry