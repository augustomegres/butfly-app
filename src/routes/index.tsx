import React from 'react'
import { Route, Routes as BrowserRouter } from 'react-router-dom'
import { Navbar } from '../layout/Navbar'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { NotFound } from '../pages/NotFound'
import { Register } from '../pages/Register'
import { Products } from '../pages/Products'

export function Routes() {
  return (
    <BrowserRouter>
      <Route path="login" element={<Login />} />
      <Route path="registro" element={<Register />} />
      <Route element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="produtos/estoque" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </BrowserRouter>
  )
}
