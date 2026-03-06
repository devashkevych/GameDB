import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import './App.css'
// import { top10 } from './components/TopG/TopG.jsx'

function App() {

  return (
    <>
      <div className='App'> 
        <div className='header'>
          <nav>
            <NavLink to='/'>GameDB</NavLink>
            <Link to='/topg'>Top 100 Games</Link>
          </nav>
        </div>

        <div className='content'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
