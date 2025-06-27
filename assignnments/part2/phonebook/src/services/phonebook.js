import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () =>{
    console.log('getting request')
    // auto parses the response field
    return axios.get(url) 
        .then(response => {return response.data})
}

const add = (name, number) => {
    const phonebookObject = {name, number}
    return axios
        .post(url, phonebookObject)
        .then(response => {
            console.log(response)
            return response.data
        })
}

const remove = (id) => {
    const nameURL = `${url}/${id}`
    return axios
        .delete(nameURL)
        .then(response => {
            console.log(response)
            return response.data
        })
}

export default {getAll, add, remove}