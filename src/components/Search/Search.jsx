import { useEffect, useState } from "react";
import GameCard from "../GameCard/GameCard";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [minLength, setMinLength] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const q = search.trim();

    setError(null);
    setMinLength(false);
    setEmpty(false);

    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (q.length < 3) {
      setResults([]);
      setLoading(false);
      setMinLength(true);
      return;
    }

    setLoading(true);

    const fetchingSearch = async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal,
        });
        if (response.ok) {
          const data = await response.json();
          const games = data.games ?? [];
          setEmpty(games.length === 0);
          setResults(games);
        } else {
          throw new Error("No data");
        }
      } catch (e) {
        if (e.name === "AbortError") return;
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    const searching = setTimeout(fetchingSearch, 500);

    return () => {
      clearTimeout(searching);
      controller.abort();
    };
  }, [search]);

  return (
    <section className="space-y-12">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5 max-w-md">
        <label
          htmlFor="search"
          className="mb-2 block text-sm font-medium text-zinc-300 sr-only"
        >
          Search
        </label>
        <input
          id="search"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder="Try GTA 6, Elder Ring, RDR 2..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />

        {loading && (
          <div className="rounded-2xl p-2 text-zinc-300">Loading...</div>
        )}
        {!loading && minLength && (
          <div className="rounded-2xl p-2 text-amber-200">
            Type more characters
          </div>
        )}
        {!loading && error && (
          <div className="rounded-2xl p-2 text-rose-300">Error: {error}</div>
        )}
        {!loading && !minLength && empty && (
          <div className="rounded-2xl p-2 text-zinc-300">
            No game found
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {!loading &&
          !minLength &&
          !empty &&
          results.map((g) => (
            <div key={g.id}>
              <GameCard game={g} />
            </div>
          ))}
      </div>
    </section>
  );
}
