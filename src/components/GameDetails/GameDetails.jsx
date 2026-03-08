import { useEffect, useState } from "react";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useParams } from "react-router-dom";

export default function GameDetails() {
  let params = useParams();
  const { id } = params;

  const [g, setG] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { toggleFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    setError(null);
    setLoading(true);

    const fetchingGame = async () => {
      try {
        const response = await fetch(`/api/gamedetails?q=${id}`);
        const data = await response.json();

        if (!response.ok) throw new Error("Fetching error occured...");

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
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !g && <p>No game found</p>}
      {!loading && g && (
        <div>
          <h1>GameID: {id}</h1>
          <h1>{g.name}</h1>
          <h3>
            {g.rating !== null && g.rating !== undefined ? g.rating : "N/A"}
          </h3>
          {g.cover?.url ? (
            <img src={g.cover.url} alt="" />
          ) : (
            <div>No image</div>
          )}
          <button
            onClick={() => {
              toggleFavorites(g);
            }}
          >
            {isFavorite(g.id) ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      )}
    </div>
  );
}
