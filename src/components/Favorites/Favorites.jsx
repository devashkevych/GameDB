import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import GameCard from "../GameCard/GameCard";

export default function Favorites() {
  const { favorites, toggleFavorites, isFavorite } = useFavorites();

  return (
    <div>
      <div className="space-y-3">

      <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
        Favorites
      </h3>
      <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">
        Games you love
      </h1>
      {favorites.length === 0 && (
        <p className="rounded-2xl p-2 text-zinc-300">
          No favorite games yet...
        </p>
      )}
      </div>
      <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {favorites.map((g) => (
          <li key={g.id}>
            <GameCard game={g} />
          </li>
        ))}
      </ul>
    </div>
  );
}
