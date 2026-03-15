import { NavLink, Outlet } from "react-router-dom";

function App() {
  const navClass = ({ isActive }) =>
    `rounded-xl px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-500 text-white shadow-md whitespace-nowrap"
        : "text-zinc-300 hover:bg-zinc-800 hover:text-white whitespace-nowrap"
    }`;

  return (
    <div className="min-h-screen bg-zinc-800 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <NavLink
            to="/"
            className="text-2xl transition duration:300 font-bold tracking-tight text-white self-center  hover:text-shadow-lg hover:text-shadow-indigo-500/50"
          >
            GameDB
          </NavLink>
          <nav className="flex items-center gap-2 justify-between">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>
            <NavLink to="/topg" className={navClass}>
              Top Games
            </NavLink>
            <NavLink to="/favorites" className={navClass}>
              Favorites
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
