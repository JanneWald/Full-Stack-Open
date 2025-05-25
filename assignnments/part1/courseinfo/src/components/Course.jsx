const Parts = ({parts}) => {
    console.log(parts)
    let sum = 0
    parts.forEach(part => {
        sum += part.exercises
    });
    return (
        <div>
            {parts.map(part => <p key={part.id}>{part.name}, {part.exercises}</p>) }
            <b>Sum of exercises is {sum}</b>
        </div> 
    )
}
const Course = ({course}) => {
    const {parts, name, id} = course
    console.log(name)
        console.log(id)
            console.log(parts)
    return (
        <div>
        <h1>{name}</h1>
        <Parts parts={parts}/>
        </div>
    )
}
export default Course