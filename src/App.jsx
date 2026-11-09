import React from 'react'
import "./index.css"
import {Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import Signup from "./Pages/Singup";
import Signin from "./Pages/Singin";
import Dashboard from "./Pages/Dashboard";
import Sendmoney from "./Pages/Sendmoney";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/sendmoney' element={<Sendmoney />} />
    </Routes>
    
  )
}

export default App
