import { Link } from "react-router";
import { useFavorites } from "../../contexts/FavoritesContext";

export default function GameCard({ game }) {
  const { isFavorite, toggleFavorites } = useFavorites();

  return (
    <div>
      <Link to={`/games/${game.id}`}>
        <h3>{game.name}</h3>
        <p>
          {game.rating !== null && game.rating !== undefined
            ? Number(game.rating).toFixed(1)
            : "N/A"}
        </p>
        {game.cover?.url ? (
          <img src={game.cover.url} alt="" />
        ) : (
          <div>No image</div>
        )}
      </Link>
      <button
        onClick={() => {
          toggleFavorites(game);
        }}
      >
        {isFavorite(game.id) ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
