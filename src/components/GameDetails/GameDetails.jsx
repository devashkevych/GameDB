import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useFavorites } from "../../contexts/FavoritesContext";

export default function GameDetails() {
  const { state } = useLocation();
  const { toggleFavorites, isFavorite } = useFavorites();
  const g = state?.game;
  const rating = g.rating;

  if (!g) {
    return (
      <div>
        <h2>No data available</h2>
        <p>Reloaded page or direct access denied.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{g.name}</h1>
      <h3>{rating !== null && rating !== undefined ? rating : "N/A"}</h3>
      <p>{g.id}</p>
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
        {isFavorite(g.id) ? "Remove to Favorites" : "Add from Favorites"}
      </button>
    </div>
  );
}
