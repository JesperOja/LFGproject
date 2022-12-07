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
            <div className='flex bg-gray-300 divide-x divide-slate-200'>
                {myGames.map(game =>
                    <div key={Number(game.id)} className="flex items-start space-x-6 p-6">
                        <Link to={`/game/${Number(game.id)}`}><div >
                            <h1 className='font-bold h-fit ml-[7px]'>{game.name}</h1> 
                        </div>
                        <div >
                            
                            <h4 className="flex-none w-full mt-2 font-normal ml-[7px]">{game.hours} Hours</h4>
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