import { useState } from 'react'
import './assets/App.css'
import {Routes, Route} from "react-router-dom"

import Navbar from './components/Navbar'
import Auth from './Pages/Auth'
import Landingpage from './Pages/Landingpage'
import Test from './Pages/Test'
import Success from './Pages/Success'
import Fail from './Pages/Fail'
import Fournotfour from './Pages/fournotfour'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      {/* route to Auth if email not present in sessionStorage else go to Landing page*/}
      <Route path="/" element={sessionStorage.getItem('email') ? <Landingpage /> : <Auth />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/landingpage" element={<Landingpage />} /> 
      <Route path="/test/:id" element={<Test />} />
      <Route path="/test/success" element={<Success />} />
      <Route path="/test/fail" element={<Fail />} />
      <Route path='/*' element={<Fournotfour />} />
    </Routes>
    </>
  )
}

export default App
