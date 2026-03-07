import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <div className="header">
          <nav>
            <NavLink to="/">GameDB</NavLink>
            <NavLink to="/topg">Top 100 Games</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
          </nav>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
