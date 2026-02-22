import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import './App.css'
import { auth } from './components/Authorization/Authorization.jsx'
import { top10 } from './components/topg/topg.jsx'

function App() {

  return (
    <>
      <div className='App'> 
        <div className='header'>
          <nav>
            <NavLink to='/'>GameDB</NavLink>
            <Link to='/topg'>Top 100 Games</Link>
            <button onClick={auth}>Auth</button>
            <button onClick={top10}>Top 10</button>
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
