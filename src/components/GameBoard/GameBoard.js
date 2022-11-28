import GameCard from '../GameCard';
import './styles.css';


export default function GameBoard() {
    const shapes = {
        circle: <i class="bi bi-circle-fill"></i>,
        square: <i class="bi bi-square-fill"></i>,
        triangle: <i class="bi bi-triangle-fill"></i>,
        pentagon: <i class="bi bi-pentagon-fill"></i>,
        hexagon: <i class="bi bi-hexagon-fill"></i>,
        star: <i class="bi bi-star-fill"></i>
    };

    return (
        <div className="game-board">
            <GameCard icon={shapes.circle}/>
            <GameCard icon={shapes.circle}/>
            <GameCard icon={shapes.square}/>
            <GameCard icon={shapes.square}/>
            <GameCard icon={shapes.triangle}/>
            <GameCard icon={shapes.triangle}/>
            <GameCard icon={shapes.pentagon}/>
            <GameCard icon={shapes.pentagon}/>
            <GameCard icon={shapes.hexagon}/>
            <GameCard icon={shapes.hexagon}/>
            <GameCard icon={shapes.star}/>
            <GameCard icon={shapes.star}/>
        </div>
    );
}