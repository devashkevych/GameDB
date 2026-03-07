import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import GameCard from "../GameCard/GameCard";
import { useEffect } from "react";

export default function Favorites() {
  const { favorites, toggleFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    console.log(favorites);
  }, []);

  return (
    <div>
      <h3>Favorites</h3>
      <Link to="/">Back</Link>
      <ul>
        {favorites.map((g) => (
          <li key={g.id}>
            <Link to={`/${g.id}`} state={{ game: g }}>
              <GameCard game={g} />
            </Link>
            <button
              onClick={() => {
                toggleFavorites(g);
              }}
            >
              {isFavorite(g.id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
