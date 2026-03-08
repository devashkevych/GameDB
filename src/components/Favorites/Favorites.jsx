import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import GameCard from "../GameCard/GameCard";

export default function Favorites() {
  const { favorites, toggleFavorites, isFavorite } = useFavorites();

  return (
    <div>
      <h3>Favorites</h3>
      {favorites.length === 0 && <p>No favorite games yet...</p>}
      <Link to="/">Back</Link>
      <ul>
        {favorites.map((g) => (
          <li key={g.id}>
            <GameCard game={g} />
          </li>
        ))}
      </ul>
    </div>
  );
}
