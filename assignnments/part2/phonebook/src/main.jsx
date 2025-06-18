import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Getting rid of safe mode stops double rendering, thus double logs, obviously not ideal for real deployment
createRoot(document.getElementById('root')).render(
    <App />
)
