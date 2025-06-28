import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Info from './components/Info'
import Countries from './components/Countries'

const url = "https://studies.cs.helsinki.fi/restcountries/api"

function App() {

  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState("")

  const onFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const overrideFilter = (filter) => {
    console.log(`Pressed button to change filter t ${filter}`)
    setFilter(filter)
  } 

  useEffect(() => {
    axios.get(`${url}/all`)
      .then(response => {return response.data})
      .then(data => setCountries(data))
      .catch(() => console.log("whoops, no counties for you"))
      console.log(countries)
  },[])

  const [count, setCount] = useState(0)
  
  const getCountries = () => {
    return countries.filter(country => (country.name.common.toLowerCase().includes(filter.toLowerCase())))
  } 


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Countries Info search</h1>
      <p>Countries count: {countries.length}</p>
      <label> Country Filter: <input value={filter} onChange={onFilter} /></label>
      <Countries countries={getCountries()} overrideFilter={overrideFilter}/>
    </>
  )
}

///       

export default App
