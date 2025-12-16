import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import CreateProductForm from './components/CreateProductForm'
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage'
import ProductPage from './pages/ProductPage';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
      </div>
      <div className='relative z-50 pt-20'>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/:category' element={<CategoryPage />} />
          <Route path='/products/:products' element={<ProductPage />} />
          <Route path='/dashboard' element={ <AdminPage />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App
