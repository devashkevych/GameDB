import { useEffect, useState } from "react";
import GameCard from "../GameCard/GameCard";
import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [minLength, setMinLength] = useState(false);
  const {toggleFavorites, isFavorite} = useFavorites();

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
    <div>
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
      />
      <ul>
        {loading && <li style={{ listStyleType: "none" }}>Loading...</li>}
        {!loading && minLength && (
          <li style={{ listStyleType: "none" }}>Type more characters...</li>
        )}
        {!loading && !minLength && empty && (
          <li style={{ listStyleType: "none" }}>No game found...</li>
        )}
        {!loading &&
          !minLength &&
          !empty &&
          results.map((g) => (
            <li key={g.id} style={{ listStyleType: "none" }}>
              <Link to={`/${g.id}`} state={{ game: g }}>
                <GameCard game={g} />
              </Link>
              <button
                onClick={() => {
                  toggleFavorites(g);
                }}
              >
                {isFavorite(g.id)
                  ? "Remove to Favorites"
                  : "Add from Favorites"}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
