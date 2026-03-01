import { useLocation } from "react-router-dom"
import { useEffect } from "react";

export default function GameDetails() {
    const { state } = useLocation();
    const game = state?.game
    const rating = game.rating

    if(!game) {
        return (
            <div>
                <h2>No data available</h2>
                <p>Reloaded page or direct access denied.</p>
            </div>
        )
    
    }
    
    return (
        <div>
            <h1>{game.name}</h1>
            <h3>{rating !== null && rating !== undefined ? rating : 'N/A'}</h3>
            <p>{game.id}</p>
            {game.cover?.url ? (
                <img src={game.cover.url} alt="" />        
            ) : <div>No image</div>}
        </div>
    )
}