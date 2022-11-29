import { useEffect, useState } from 'react';
import GameCard from '../GameCard';
import './styles.css';


export default function GameBoard() {
    const [board, setBoard]= useState([]);
    useEffect(() => {
        // Instantiate array of shape objects
        // TODO: Randomize placement of shapes
        const shapes = [
            "circle", "circle", "square", "square",
            "triangle", "triangle", "pentagon", "pentagon",
            "hexagon", "hexagon", "star", "star"
        ]
        const newBoard = [];
        shapes.forEach((shape) => {
            newBoard.push({
                icon: shape,
                className: 'game-card'
            });
        });
        setBoard(newBoard);
    }, []);

    const [firstChoice, setFirstChoice] = useState(-1);
    const [secondChoice, setSecondChoice] = useState(-1);
    useEffect(() => {
        // Once second choice is made, make comparisons
        if (secondChoice > -1) {
            if (board[firstChoice].icon === board[secondChoice].icon) {
                setTimeout(() => alert('You found a match'), 1000);
            } else {
                setTimeout(() => {
                    setBoard((prevBoard) => {
                        prevBoard[firstChoice].className = 'game-card';
                        prevBoard[secondChoice].className = 'game-card';
                        return [...prevBoard]
                    });
                }, 1200);
            }
            // Reset choices whether match or mismatch
            setFirstChoice(-1);
            setSecondChoice(-1);
        }
    }, [secondChoice]);

    const handleClick = (e) => {
        // Get the index of this card in the board array
        const boardIdx = parseInt(e.target.attributes.boardposition.value);
        // Change the className in the object in the board
        setBoard((prevBoard) => {
            prevBoard[boardIdx].className = prevBoard[boardIdx].className === 'game-card' ? 'game-card flipped' : 'game-card';
            return [...prevBoard];
        });
        // This will cause rerender of board
        // Set choice accordingly
        if (firstChoice === -1) {
            setFirstChoice(boardIdx);
        } else if (secondChoice === -1) {
            setSecondChoice(boardIdx);
        }  
    }

    return (
        <div className="game-board">
            {
                board.map((card, i) => {
                    return <GameCard 
                            key={i}
                            boardPosition={i} 
                            icon={card.icon} 
                            handleClick={handleClick} 
                            className={card.className} />;
                })
            }
        </div>
    );
}