export default function GameCard({ game }) {
    const rating = game.rating

    return (
        <div>
            <h3>{game.name}</h3>
            <p>{rating !== null && rating !== undefined ? Number(game.rating).toFixed(1) : 'N/A'}</p>
            {game.cover?.url ? (<img src={game.cover.url} alt="" />) : <div>No image</div>}
        </div>
    )
}