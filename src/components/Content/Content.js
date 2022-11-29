import { useState } from 'react';
import GameBoard from '../GameBoard';
import GameOver from '../GameOver';
import './styles.css';

export default function Content() {
    const [gameOver, setGameOver] = useState(false);

    return (
        <div className="content">
            <GameBoard setGameOver={setGameOver}/>
            {gameOver && <GameOver />}
        </div>
    );
}