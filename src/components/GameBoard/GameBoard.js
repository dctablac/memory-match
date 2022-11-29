import GameCard from '../GameCard';
import './styles.css';

export default function GameBoard(props) {
    return (
        <div className="game-board">
            {
                props.board.map((card, i) => {
                    return <GameCard 
                            key={i}
                            boardPosition={i} 
                            icon={card.icon} 
                            onClick={props.onClick} 
                            className={card.className} />;
                })
            }
        </div>
    );
}