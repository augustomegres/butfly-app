import { Route, Routes as BrowserRouter } from 'react-router-dom'
import { Navbar } from 'layout/Navbar'
import { Login } from 'pages/Login'
import { Register } from 'pages/Register'
import { Home } from 'pages/Home'
import { Checkout } from 'pages/Checkout'
import { NotFound } from 'pages/NotFound'
import { Products } from 'pages/Products'
import { ThemeSelection } from 'pages/ThemeSelection'
import { Product } from 'pages/Product'
import { Customer } from 'pages/Customer'
import { NewCustomer } from 'pages/NewCustomer'

export function Routes() {
  return (
    <BrowserRouter>
      <Route path="login" element={<Login />} />
      <Route path="registro" element={<Register />} />
      <Route element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/ponto-de-venda" element={<Checkout />} />
        <Route path="/clientes" element={<Customer />} />
        <Route path="/clientes/novo-cliente" element={<NewCustomer />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/produtos/:id" element={<Product />} />
        <Route path="/personalizar" element={<ThemeSelection />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </BrowserRouter>
  )
}
