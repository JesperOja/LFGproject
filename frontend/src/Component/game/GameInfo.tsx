import React from "react";
import { Link, useParams } from "react-router-dom";
import { deleteGame, getAll } from "../../services/gameService";
import { useStateValue } from "../../state/state";
import { Game, ProfileModel } from "../../types";
import { rootNavigate } from "../router/CustomRouter";
import GameEditForm from "./GameEditForm";

const GameInfo: React.FC = () => {
    const [{ games, profile }, dispatch] = useStateValue();
    const [form, toggleForm] = React.useState<boolean>(false);

    const toggle = () => {
        toggleForm(!form);
    }


    const id = useParams().id as string;
    const gameInfo = Object.values(games).find(game => Number(game.id) === Number(id)) as Game;

    const thisUser: ProfileModel = Object.values(profile).find(prof => Number(prof.id) === Number(gameInfo.profileId)) as ProfileModel;
    const GameDelete = (id: number) => {
        if (window.confirm(`Do you really want to delete ${gameInfo.name} from your collection?`)) {
            deleteGame(id).then(mes => {
                console.log(mes);
                getAll().then(game => {
                    const games: Game[] = game as Game[];

                    dispatch({ type: "GET_GAME_LIST", payload: games });
                    rootNavigate("/profile");
                    window.location.reload();
                });
            });
        }

    }
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

            <div>
                <button onClick={toggle}>Edit game</button>
                {form &&
                    <GameEditForm currentGame={gameInfo} toggleForm={toggle} />
                }
                <button onClick={() => GameDelete(Number(gameInfo.id))}>Delete Game</button>
            </div>
        </>
    )
}

export default GameInfo;