import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard";

export default  function TopG() {

    const [games, setGames] = useState([])

    useEffect(() => {
        const top10 = async () => {
            const response = await fetch('/api/games')
            const data = await response.json()

            setGames(data.games)
        }

        top10()
}, [])

    return (
        <div>
            <h1>TopG</h1>
            <Link to='/'>Back</Link>
            <ul>
                {games.map( g => (
                    <li key={g.id}><GameCard game={g}/></li>
                ))}
            </ul>
        </div>
    )
}