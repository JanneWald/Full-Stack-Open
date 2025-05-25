const Parts = ({parts}) => {
    console.log(parts)
    console.log("reducing")

    // Get total of exercises
    const total = parts.reduce(
        (sum, part) => {
            console.log("Reducing part:", part)
            return sum + part.exercises}, 0 // 0 is init value of sum
    )
    console.log("total:", total)

    // Map each exercise to a new p
    return (
        <div>
            {parts.map(part => <p key={part.id}>{part.name}, {part.exercises}</p>) }
            <b>Sum of exercises is {total}</b>
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