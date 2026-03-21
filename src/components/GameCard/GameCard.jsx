import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";

export default function GameCard({ game }) {
  const { isFavorite, toggleFavorites } = useFavorites();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 min-w-[130px]">
      <Link to={`/games/${game.id}`} className="block">
        {game.cover?.url ? (
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={game.cover.url.replace("t_thumb", "t_cover_big")}
              alt={game.name}
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[3/4] items-center justify-center bg-zinc-800">
            No image
          </div>
        )}

        <div className="p-4">
          <div className="flex justify-between gap-2">
            <h3 className="line-clamp-2 min-h-[3rem] font-semibold text-md sm:text-lg">
              {game.name}
            </h3>
            <span className="hidden sm:inline-flex sm:text-md text-zinc-400">
              {game.rating !== null && game.rating !== undefined
                ? Math.round(game.rating) / 10
                : "N/A"}
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-auto p-4 pt-0">
        <button
          onClick={() => {
            toggleFavorites(game);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-6 transition duration-200 hover:drop-shadow-lg hover:drop-shadow-rose-500/50   ${isFavorite(game.id) ? "text-rose-500 active:text-rose-700 hover:text-rose-500" : "text-zinc-400 active:text-rose-700 hover:text-rose-300"}`}
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
