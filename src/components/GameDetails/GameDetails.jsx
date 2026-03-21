import { useEffect, useState } from "react";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useParams } from "react-router-dom";

export default function GameDetails() {
  let params = useParams();
  const { id } = params;

  const [g, setG] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [collapsed, setCollapsed] = useState(true);

  const { toggleFavorites, isFavorite } = useFavorites();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    return new Date(timestamp * 1000).toLocaleDateString();
  };

  useEffect(() => {
    setError(null);
    setLoading(true);

    const fetchingGame = async () => {
      try {
        const response = await fetch(`/api/gamedetails?q=${id}`);
        if (!response.ok) throw new Error("Fetching error occured...");
        const data = await response.json();
        setG(data[0] ?? null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchingGame();
  }, [id]);

  return (
    <div className="mx-auto max-w-5xl p-6">
      {loading && <p className="text-zinc-400">Loading...</p>}

      {!loading && !g && <p className="text-zinc-400">No game found</p>}

      {!loading && g && (
        <div className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl p-6 min-h-screen">
          {/* main container */}
          <div className="flex flex-col gap-8 md:flex-row">
            {/* image and metadata container */}
            <div className="w-full md:w-[300px] flex-shrink-0">
              {g.cover?.url ? (
                <img
                  src={g.cover.url.replace("t_thumb", "t_cover_big")}
                  alt={g.name}
                  className="w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-[400px] items-center justify-center bg-zinc-800 rounder-lg">
                  No image
                </div>
              )}
            </div>
            <div className="flex flex-col md:w-256 gap-2">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{g.name}</h1>
                <button
                  onClick={() => {
                    toggleFavorites(g);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`size-6 transition duration-200 hover:drop-shadow-lg hover:drop-shadow-rose-500/50   ${isFavorite(g.id) ? "text-rose-500 active:text-rose-700 hover:text-rose-500" : "text-zinc-400 active:text-rose-700 hover:text-rose-300"}`}
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                </button>
              </div>
              <div className="w-fit text-zinc-300 border rounded border-indigo-400 py-1 px-2 font-semibold">
                Rating:{" "}
                {g.rating !== null && g.rating !== undefined
                  ? Math.round(g.rating) / 10
                  : "N/A"}
              </div>
              <div className="h-px bg-zinc-700 my-2 md:w-1/2"></div>

              <div className="flex flex-wrap gap-2 items-center">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
                  Genres:
                </h2>
                {g.genres
                  ? g.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="text-zinc-300 border rounded border-indigo-400 py-1 px-2 font-semibold flex-shrink-0"
                      >
                        {genre.name}
                      </span>
                    ))
                  : "N/A"}
              </div>
              <div className="h-px bg-zinc-700 my-2 md:w-1/2"></div>
              <div className="flex flex-wrap gap-2 items-center">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
                  Platforms:
                </h2>
                {g.platforms
                  ? g.platforms.map((platform) => (
                      <span
                        key={platform.id}
                        className="text-zinc-300 border rounded border-indigo-400 py-1 px-2 font-semibold flex-shrink-0"
                      >
                        {platform.name}
                      </span>
                    ))
                  : "N/A"}
              </div>
              <div className="h-px bg-zinc-700 my-2 md:w-1/2"></div>
              <div className="flex gap-2 items-center">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400 ">
                  Release Date:
                </h2>
                <span className="font-semibold text-zinc-300">
                  {formatDate(g.first_release_date)}
                </span>
              </div>
            </div>
          </div>
          <div>
            {/* story container */}
            {g.storyline && (
              <div>
                <div className="h-px bg-zinc-700 my-4"></div>
                <h2 className="text-xl font-semibold mb-2">Story</h2>
                <p
                  className={
                    collapsed
                      ? "line-clamp-3 sm:line-clamp-2 text-zinc-300"
                      : "text-zinc-300"
                  }
                >
                  {g.storyline}
                </p>
                <span className="text-indigo-400">
                  <button
                    onClick={() => {
                      toggleCollapse();
                    }}
                  >
                    {collapsed ? "Show more" : "Show less"}
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
