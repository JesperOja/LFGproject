import React from "react";
import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../../state/state";
import { Game, ProfileModel } from "../../types";

const GameInfo: React.FC = () => {
    const [{games, profile}] = useStateValue();

    const id = useParams().id as string;
    const gameInfo = Object.values(games).find(game => Number(game.id) === Number(id)) as Game;
    
    const thisUser: ProfileModel = Object.values(profile).find(prof => Number(prof.id) === Number(gameInfo.profileId)) as ProfileModel;

    return ( 
        <>
            <h1 className="text-3xl font-bold underline">
                {gameInfo.name}
            </h1>
            <div>
                Hours played: {gameInfo.hours}
            </div>
            <div>
                Rank: {gameInfo.rank}
            </div>
            <div>
                Server: {gameInfo.server}
            </div>
            <div>
                Nickname ingame: {gameInfo.nicknameIngame}
            </div>
            <div>
                Comments about the game: {gameInfo.comments} by <Link to={`/profile/${Number(thisUser.id)}`}>{thisUser.username}</Link>
            </div>
        </>
    )
}

export default GameInfo;