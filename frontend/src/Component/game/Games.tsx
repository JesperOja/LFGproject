import { Link } from "react-router-dom";
import { useStateValue } from "../../state/state";
import { ProfileModel } from "../../types";

interface Props {
    currentUser: ProfileModel;
}

const Games: React.FC<Props> = ({ currentUser }) => {
    const [{ games }] = useStateValue();
   
    const myGames = Object.values(games).filter(game => Number(game.profileId) === Number(currentUser.id));

    if (myGames) {
        return (
            <div className='flex'>
                {myGames.map(game =>
                    <div key={Number(game.id)} >
                        <Link to={`/game/${Number(game.id)}`}><div >
                            <h4 >{game.name}</h4> 
                        </div>
                        <div >
                            
                            <h1 >{game.hours} Hours</h1>
                        </div></Link>
                    </div>
                )}
            </div>
        )
    } else {
        return (<></>)
    }

}

export default Games;