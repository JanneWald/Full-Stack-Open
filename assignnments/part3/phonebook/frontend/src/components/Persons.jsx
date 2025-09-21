const Persons = ({ persons, removePerson }) => {
  return(
    <div>
      <ul>
        {persons.map((person) =>
          <li key={person.id}>{person.name} - {person.number}
            <button onClick={() => {removePerson(person.id)}}> Remove</button>
          </li>)}
      </ul>
    </div>
  )
}
export default Persons