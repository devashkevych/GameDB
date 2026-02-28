import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard";

export default  function TopG() {

    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [retry, setRetry] = useState(false)

    useEffect(() => {
        setError(null)
        setLoading(true);
        const top10 = async () => {
            try {
                const response = await fetch('/api/games')
                if (response.ok) {
                    const data = await response.json()
                    setGames(data.games)
                } else {
                    throw new Error('something went wrong...try again')
                }
                
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }

        }

        top10()
    }, [retry])

    if(loading) return <h3>Loading...</h3>
    if(error) return <div>
        <h3>Error: {error}</h3>
        <button onClick={() => setRetry(r => !r)}>Retry</button>
    </div>

    return (
        <div>
            <h1>TopG</h1>
            <Link to='/'>Back</Link>
            <ul>
                {games.map( g => (
                    <Link key={g.id} to={`/topg/${g.id}`} state={{ game: g }}><li ><GameCard game={g}/></li></Link>
                ))}
            </ul>
        </div>
    )
}