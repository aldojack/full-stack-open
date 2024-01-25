import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState();
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    if (search) {
      const searchString = search.toLowerCase(); 
      setFilteredCountries(
        countries.filter((country) => country.name.common.toLowerCase().includes(searchString))
      );
    } else {
      setFilteredCountries([]);
    }
  }, [search]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const Country = ({country}) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <div>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map(language => <li>{language}</li>)}
          </ul>
          <div>
            <img src={country.flags["png"]}/>
          </div>
        </div>
      </div>
    )
  }

  const CountriesList = ({countries}) => {
    return countries.map((country) => (
      <p key={country.name.common}>{country.name.common}</p>
    ));
  };

  const Message = ({ message }) => <p>{message}</p>;

  return (
    <div>
      <label>
        Find countries:{" "}
        <input type="text" value={search} onChange={handleChange} />
      </label>
      {filteredCountries && (
        <>
          {filteredCountries.length > 10 && <Message message="Too many matches, try being more specific" />}
          {(filteredCountries.length > 1 && filteredCountries.length < 10) && <CountriesList countries={filteredCountries} />}
          {filteredCountries.length === 1 && <Country country={filteredCountries[0]}/>}
        </>
      )}
    </div>
  );
}

export default App;
