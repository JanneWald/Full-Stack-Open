// Info page for a country
const Info = ({country}) => {
    if (!country)
        return null

    const boxStyle = {
        color: 'white',
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '1.5rem',
        margin: '1rem 0',
        maxWidth: '400px',
        backgroundColor: 'transparent',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }
    
    const flagStyle = {
        fontSize: '8rem',
        display: 'block',
        textAlign: 'center',
        marginTop: '1rem'
    }

    
    const name = country.name.common
    const capital = country.capital
    const area = country.area
    const languages = country.languages
    const flag = country.flag
    return(
        <div style={boxStyle}>
            <h2>{name}</h2>
            <p>Capital: {capital}</p>
            <p>Area: {area} km²</p>
            <h4>Languages Spoken:</h4>
            
            <ul>
                {Object.values(languages).map((lang, i) => (
                    <li key={i}>{lang}</li>
                ))}
            </ul>
            <div style={flagStyle}>{flag}</div>
        </div>
    )
}

export default Info