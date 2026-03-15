import { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard";

export default function TopG() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);
    const top10 = async () => {
      try {
        const response = await fetch("/api/games");
        if (response.ok) {
          const data = await response.json();
          setGames(data.games);
        } else {
          throw new Error("Something went wrong...");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    top10();
  }, [retry]);

  return (
    <div>
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
          Top Games
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">
          Explore best games of the best decade
        </h1>
        {loading && (
          <h3 className="rounded-2xl p-2 text-zinc-300">Loading...</h3>
        )}
      </div>
      {error && (
        <div>
          <h3 className="rounded-2xl p-2 text-rose-300">Error: {error}</h3>
          <button
            className="text-zinc-300 border rounded-xl px-4 py-2  transition border-indigo-400 text-sm font-medium hover:text-white hover:bg-indigo-600/50 hover:border-indigo-500"
            onClick={() => setRetry((r) => !r)}
          >
            Retry
          </button>
        </div>
      )}
      <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {games.map((g) => (
          <li className="h-full" key={g.id}>
            <GameCard game={g} />
          </li>
        ))}
      </ul>
    </div>
  );
}
