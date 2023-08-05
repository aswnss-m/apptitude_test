import { useState } from 'react'
import './assets/App.css'
import Auth from './Pages/Auth'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Auth />
    </>
  )
}

export default App
