import { Link } from "react-router-dom";

export const SimilarGames = ({ game }) => {
  return (
    <Link to={`/games/${game.id}`}>
      <div className="flex flex-col border w-50 border-indigo-400/70 rounded-xl p-4">
        <div className="flex-shrink-0">
          {game.cover?.url ? (
            <img
              src={game.cover.url.replace("t_thumb", "t_cover_big")}
              alt={game.name}
              className="w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-[400px] items-center justify-center bg-zinc-800 rounder-lg">
              No image
            </div>
          )}
        </div>
        <div className="flex items-center min-h-[4rem]">
          <span className="line-clamp-2 min-h-[2rem] font-semibold text-lg">
            {game.name}
          </span>
        </div>
      </div>
    </Link>
  );
};
