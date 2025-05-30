const PersonForm = ({newName, updatePerson, newNumber, updateNumber, addPerson}) => {
    return(
        <form>
            <div>
                <h2>Add Person</h2>
                name: 
                <input 
                value={newName}
                onChange={updatePerson}
                />
                number:
                <input 
                value={newNumber}
                onChange={updateNumber}
                />
            </div>
            <div>
                <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form>
    )
}
export default PersonForm