import './styles.css';

export default function GameCard(props) {

    return (
        <div className={props.className} 
            boardposition={props.boardPosition} 
            onClick={props.handleClick}
        >
            <i className={`bi bi-${props.icon}-fill`}></i>
        </div>
    );
}