import axios from 'axios'
const url = '/api/persons' // No longer need full localhost:3001 url if same host with frontend build

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

const update = (previousEntry, newNumber) => {
    const newEntry = {...previousEntry, "number": newNumber}
    return axios
        .put(`${url}/${previousEntry.id}`, newEntry)
        .then(response => {
            console.log(response)
            return response.data
        })
}

export default {getAll, add, remove, update}