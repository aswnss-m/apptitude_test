import { useState } from 'react'
import './assets/App.css'
import Navbar from './components/Navbar'
import Auth from './Pages/Auth'
import Landingpage from './Pages/Landingpage'
import {Routes, Route} from "react-router-dom"
function App() {

  return (
    <>
    <Navbar />
    <Routes>
      {/* route to Auth if email not present in sessionStorage else go to Landing page*/}
      <Route path="/" element={sessionStorage.getItem('email') ? <Landingpage /> : <Auth />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/landingpage" element={<Landingpage />} /> 
    </Routes>
    </>
  )
}

export default App
