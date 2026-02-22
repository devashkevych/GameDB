import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import TopG from './components/topg/topg.jsx'
import Home from './components/Home/Home.jsx'

const root = document.getElementById('root')

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/topg' element={<TopG />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
