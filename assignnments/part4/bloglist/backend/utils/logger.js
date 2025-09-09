/* 
A wrapper to differentiate between a std::out and std:err logs 
*/
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }
