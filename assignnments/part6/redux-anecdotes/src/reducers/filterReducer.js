const filterReducer = (state = '', action) => {
  switch (action.type){
    case 'FILTER': {
      return action.payload
    }
    
    default: 
      return state
  }
}

export default filterReducer

export const changeFilter = (newFilter) => { return {type:'FILTER', payload:newFilter} }