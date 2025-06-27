import Info from './Info'



const Countries = ({countries}) => {

    const Show= () => {
        return <button> Show </button>
    }

    console.log(`Passed to list ${countries}`)
    const numOfCountries = countries.length
    if (numOfCountries > 10){
        return(
            <>
                <h2>Available Countries</h2>
                <p> Refine your search</p>
            </>
        )
    }
    else if (numOfCountries == 1){
        return <Info country={countries[0]} />
    }
    return(
    <>
    <h2>Available Countries</h2>
      <ul>
      {
        countries.map((country) => <li key={country.cca3}> {country.name.common} <Show /></li>)
      }
      </ul>
    </>
    )
}

export default Countries