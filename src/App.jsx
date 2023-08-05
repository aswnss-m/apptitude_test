import { useState } from 'react'
import './assets/App.css'
import Navbar from './components/Navbar'
import Auth from './Pages/Auth'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Auth />
    </>
  )
}

export default App
