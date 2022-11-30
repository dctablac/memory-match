import CardLogo from '../CardLogo/CardLogo';
import './styles.css';

export default function GameCard(props) {

    return (
        <div className={props.className} 
            boardposition={props.boardPosition} 
            onClick={props.onClick}
        >
            <i className={`bi bi-${props.icon}-fill`}></i>
            <CardLogo />
        </div>
    );
}