import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFavorites } from "../../contexts/FavoritesContext";
import GameCard from "../GameCard/GameCard";

export default function TopG() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);
  const { favorites, toggleFavorites, isFavorite } = useFavorites();

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
          throw new Error("Something went wrong...try again");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    top10();
  }, [retry]);

  if (loading) return <h3>Loading...</h3>;
  if (error)
    return (
      <div>
        <h3>Error: {error}</h3>
        <button onClick={() => setRetry((r) => !r)}>Retry</button>
      </div>
    );

  return (
    <div>
      <h1>TopG</h1>
      <Link to="/">Back</Link>
      <ul>
        {games.map((g) => (
          <li key={g.id}>
            <GameCard game={g} />
          </li>
        ))}
      </ul>
    </div>
  );
}
