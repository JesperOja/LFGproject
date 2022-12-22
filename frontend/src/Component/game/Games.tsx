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
                    <div key={Number(game.id)} className='animate__animated animate__fadeIn ring-4 hover:ring-4 hover:ring-primary hover:ring-offset-4 rounded-lg ring-darkBackground flex flex-col h-80 w-60 mx-2 relative text-white bg-darkBackground hover:bg-primary'>
                        <Link to={`/game/${Number(game.id)}`}><div className='absolute top-0 w-full text-center py-3'>
                        </div>
                            
                            <div className='pb-2 h-[140px] w-full absolute bottom-0 bg-gradient-to-t from-darkBackground via-darkBackground rounded-b-lg'>
                                <div className='mt-auto absolute bottom-0 w-[90%] mx-[5%] mb-2'>
                                    <h1 className='text-xl font-semibold border-b pb-1 text-center'>{game.name}</h1>
                                    <h2 className='text-lg italic font-semibold text-center'>{game.hours} Hours</h2>
                                </div>
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