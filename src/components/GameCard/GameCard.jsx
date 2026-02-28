export default function GameCard({ game }) {
    return (
        <div>
            <h3>{game.name}</h3>
            <p>{game.rating ? Number(game.rating).toFixed(1) : 'N/A'}</p>
            <img src={game.cover.url ? game.cover.url : 'No image'} alt="" />
        </div>
    )
}