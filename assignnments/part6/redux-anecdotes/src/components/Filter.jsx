import { useSelector, useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const updateFilter = (event) => {
    event.preventDefault()
    dispatch(changeFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <>
      <p>Filter
        <input style={style}
          value={filter}
          onChange={updateFilter}
        />
      </p>
    </>
  )
}

export default Filter