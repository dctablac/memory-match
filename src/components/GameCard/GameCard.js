import './styles.css';

export default function GameCard(props) {
    return (
        <div className="game-card">
            {props.icon}
        </div>
    );
}