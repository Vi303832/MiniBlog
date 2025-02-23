import { useState } from 'react'
import { Routes, Route } from "react-router"
import Home from './Pages/Home'
import Header from "./Pages/Header"
import Diisplay from "./Pages/Display"
import { BrowserRouter } from 'react-router'
import Login from "./Pages/Login"

import AddBlog from "./Pages/AddBlog"
import { ToastContainer, toast } from 'react-toastify';

function App() {



  return (
    <>

      <div >
        <BrowserRouter>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Blog" element={<Diisplay />} />
            <Route path="/Login" element={<Login />} />

            <Route path="/AddBlog" element={<AddBlog />} />

          </Routes>

        </BrowserRouter>



      </div >
    </>
  )
}

export default App
