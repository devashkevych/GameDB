import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const stored = localStorage.getItem("favorites");
  const [favorites, setFavorites] = useState(() =>
    stored ? JSON.parse(stored) : [],
  );

  const isFavorite = (id) => {
    return favorites.some((game) => game.id === id);
  };

  const toggleFavorites = (game) => {
    const isFav = isFavorite(game.id);
    isFav
      ? setFavorites((games) =>
          games.filter((g) => {
            return g.id !== game.id;
          }),
        )
      : setFavorites((games) => [...games, game]);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const value = {
    favorites,
    toggleFavorites,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
