import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext.jsx";

import App from "./App.jsx";
import TopG from "./components/TopG/TopG.jsx";
import GameDetails from "./components/GameDetails/GameDetails.jsx";
import Home from "./components/Home/Home.jsx";
import Favorites from "./components/Favorites/Favorites.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

import "./index.css";

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/:id" element={<GameDetails />} />
            <Route path="/topg/:id" element={<GameDetails />} />
            <Route path="/topg" element={<TopG />} />
            <Route path="/favorites" element={<Favorites />}/>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  </StrictMode>,
);
