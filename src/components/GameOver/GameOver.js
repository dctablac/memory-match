import './styles.css';

export default function GameOver(props) {
    return (
        <div className="game-over">
            <div className="game-over-modal">
                <h1>Game Over!</h1>
                <button className="btn-play-again" onClick={props.onPlayAgain}>Play Again</button>
            </div>
        </div>
    );
}