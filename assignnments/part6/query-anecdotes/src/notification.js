// ✅ Custom hook
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

export const useNotification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const setNotification = (message) => {
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
  }

  return { notification, setNotification }
}
