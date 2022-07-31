import { Route, Routes as BrowserRouter } from 'react-router-dom'
import { Navbar } from '../layout/Navbar'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home'
import { Checkout } from '../pages/Checkout'
import { NotFound } from '../pages/NotFound'
import { Products } from '../pages/Products'
import { ThemeSelection } from '../pages/ThemeSelection'
import { Product } from '../pages/Product'
import { Customers } from '../pages/Customers'
import { NewCustomer } from '../pages/NewCustomer'
import { InitialSetup } from '../pages/InitialSetup'
import { AuthProvider } from '../contexts/AuthProvider'
import { RequireAuth } from '../components/RequireAuth'
import Customer from '../pages/Customer'
import { NewProduct } from '@pages/NewProduct'

export function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />

        <Route path="/primeiros-passos" element={<InitialSetup />} />
        <Route
          element={
            <RequireAuth>
              <Navbar />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/ponto-de-venda" element={<Checkout />} />
          <Route path="/clientes/:uid" element={<Customer />} />
          <Route path="/clientes" element={<Customers />} />
          <Route path="/clientes/novo-cliente" element={<NewCustomer />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:id" element={<Product />} />
          <Route path="/produtos/novo-produto" element={<NewProduct />} />
          <Route path="/personalizar" element={<ThemeSelection />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </BrowserRouter>
    </AuthProvider>
  )
}
