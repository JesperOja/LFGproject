import { useStateValue } from "../state/state";
//import { Game } from "../types";

const Games: React.FC = () => {
    const [{games}] = useStateValue();

    const myGames = Object.values(games).concat();
    
    return(
        <>
            <ul>
            {myGames.map(game =>
                    <li key={game.id}>{game.name}, Hours played: {game.hours}, comment: {game.comments} </li>
                )}
            </ul>
        </>
    )
}

export default Games;