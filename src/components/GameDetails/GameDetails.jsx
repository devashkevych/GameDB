import { useLocation } from "react-router-dom"

export default function GameDetails() {
    const { state } = useLocation();
    console.log(state)
    const game = state?.game

    return (
        <div>
            <h1>{game.name}</h1>
            <h3>{game.rating}</h3>
            <p>{game.id}</p>
            <img src={game.cover.url} alt="" />
        </div>
    )
}