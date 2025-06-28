import axios from "axios"
import { useState, useEffect } from 'react'

// Need to run npmv run dev with api key env variable:
// export VITE_SOME_KEY=keyhere && npm run dev 
const api_key = import.meta.env.VITE_SOME_KEY

const convertToFarenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2)
}

const Weather = ({capital}) => {
    const [weather, setWeather] = useState(null)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
    console.log(`weather url ${url}`)
    console.log(api_key)

    const getWeatherIcon = (id) => {
        return axios.get(`https://openweathermap.org/img/wn/${id}@2x.png`)
    }

    useEffect(() => {    axios
        .get(url)
        .then(response => {setWeather(response.data)})
        .catch(() => setWeather(null))},[])


        

    if (weather === null){
        return(
            <>
            <h2>Capital's Weather</h2>
            <p>Getting Data</p>
            </>
        )
    }
    const picture = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    console.log(`picture ${picture}`)
    return(
        <>
        <h2>Capital's Weather</h2>
        <p>Temperature is {convertToFarenheit(weather.main.temp)}F°. Feels like {convertToFarenheit(weather.main.feels_like)}F° </p>
        <p>Weather desciption of {weather.weather[0].main}</p>
        <img alt="Weather Icon"  src={picture} style={{ width: '75%', height: 'auto' }}></img>
        <p>Wind is moving at {weather.wind.speed} km/h in the direction of {weather.wind.deg} degrees</p>
        </>
    )
}

export default Weather