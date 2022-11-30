import { useState, useEffect } from 'react';
import GameBoard from '../GameBoard';
import GameOver from '../GameOver';
import './styles.css';

export default function Content() {
    const [gameOver, setGameOver] = useState(false);
    const [board, setBoard]= useState([]);
    const newGame = () => {
        // Instantiate array of shape objects
        const shapes = [
            "circle", "circle", "square", "square",
            "triangle", "triangle", "pentagon", "pentagon",
            "hexagon", "hexagon", "star", "star"
        ];
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#comment91985653_2450954
        shapes.sort(() => (Math.random() > .5) ? 1 : -1);
        setBoard(shapes.map((shape) => {
            return {
                icon: shape,
                className: 'game-card'
            }
        }));
    }
    useEffect(() => {
        newGame();
    }, []);


    const [remaining, setRemaining] = useState(6); // 6 pairs
    // Determine remaining pairs to match
    useEffect(() => {
        if (remaining === 0) {
            setGameOver(true);
        }
    }, [remaining]);


    const [firstChoice, setFirstChoice] = useState(-1);
    const [secondChoice, setSecondChoice] = useState(-1);
    const [blocked, setBlocked] = useState(false);
    // Only determine matches if second choice is made
    useEffect(() => {
        if (secondChoice > -1) {
            setBlocked(true);
            if (board[firstChoice].icon === board[secondChoice].icon) {
                setTimeout(() => {
                    setBoard((prevBoard) => {
                        prevBoard[firstChoice].className = 'game-card flipped matched';
                        prevBoard[secondChoice].className = 'game-card flipped matched';
                        return [...prevBoard]
                    });
                    setRemaining((prevRemaining) => prevRemaining - 1);
                }, 1000);
                setTimeout(() => {
                    setBlocked(false);
                }, 1700);
            } else { // Timeouts are to account for animation duration and flipping
                setTimeout(() => {
                    setBoard((prevBoard) => {
                        prevBoard[firstChoice].className = 'game-card flipped not-matched';
                        prevBoard[secondChoice].className = 'game-card flipped not-matched';
                        return [...prevBoard]
                    });
                }, 1000);
                setTimeout(() => {
                    setBoard((prevBoard) => {
                        prevBoard[firstChoice].className = 'game-card';
                        prevBoard[secondChoice].className = 'game-card';
                        return [...prevBoard]
                    });
                }, 1700);
                setTimeout(() => {
                    setBlocked(false);
                }, 2500);
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


    const handlePlayAgain = (e) => {
        e.preventDefault();
        // Restart with new board and set remaining back to 6
        setRemaining(6);
        setGameOver(false);
        newGame();
    }


    return (
        <div className="game">
            <GameBoard board={board} onClick={handleClick}/>
            {blocked && <div className="blocker"></div>}
            {gameOver && <GameOver onPlayAgain={handlePlayAgain}/>}
        </div>
    );
}