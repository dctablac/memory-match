import { useEffect, useState } from 'react';
import GameCard from '../GameCard';
import './styles.css';

export default function GameBoard(props) {
    const [board, setBoard]= useState([]);
    const newGame = () => {
        // Instantiate array of shape objects
        const shapes = [
            "circle", "circle", "square", "square",
            "triangle", "triangle", "pentagon", "pentagon",
            "hexagon", "hexagon", "star", "star"
        ];
        shuffleShapes(shapes);
        setBoard(shapes.map((shape) => {
            return {
                icon: shape,
                className: 'game-card'
            }
        }));
    }
    const shuffleShapes = (shapeArr) => {
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#comment91985653_2450954
        shapeArr.sort(() => (Math.random() > .5) ? 1 : -1);
    };
    useEffect(() => {
        newGame();
    }, []);


    const [remaining, setRemaining] = useState(6); // 6 pairs
    useEffect(() => {
        if (remaining === 0) {
            // TODO: Game over modal
            props.setGameOver(true);
        }
    });


    const [firstChoice, setFirstChoice] = useState(-1);
    const [secondChoice, setSecondChoice] = useState(-1);
    useEffect(() => {
        // Once second choice is made, make comparisons
        if (secondChoice > -1) {
            if (board[firstChoice].icon === board[secondChoice].icon) {
                setTimeout(() => {
                    setRemaining((prevRemaining) => prevRemaining - 1);
                }, 1000);
                // TODO: Set finalized matches to a different class to differ from picked ones
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
        // Set choice according to what the choices have been picked already.
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