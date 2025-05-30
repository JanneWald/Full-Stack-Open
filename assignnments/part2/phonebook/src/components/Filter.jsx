const Filter = ({value, onChange}) =>{
    return(
        <div>
            <h2>Filter</h2>
            filter names for: 
            <input
                value={value}
                onChange={onChange}
            />
            <p></p>
        </div>
    )
}
export default Filter