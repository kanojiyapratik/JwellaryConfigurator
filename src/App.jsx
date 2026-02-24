import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Admin from './pages/Admin'
import UnifiedConfigurator from './pages/UnifiedConfigurator'
import Layout from './components/Layout'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/unified-configurator" element={<UnifiedConfigurator />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
