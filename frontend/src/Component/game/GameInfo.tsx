import React from "react";
import { Link, useParams } from "react-router-dom";
import { deleteGame, getAll } from "../../services/gameService";
import { useStateValue } from "../../state/state";
import { Game, ProfileModel } from "../../types";
import { rootNavigate } from "../router/CustomRouter";
import GameEditForm from "./GameEditForm";

const GameInfo: React.FC = () => {
    const [{ games, profile, email }, dispatch] = useStateValue();
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
            <div className="w-screen h-full bg-darkBackground min-h-[calc(100vh-65px)] overflow-clip">


                <div className="w-1/2 text-gray-500 bg-lightBackground rounded-r-lg">
                    <div className="m-10">
                        <h1 className="text-4xl font-bold">
                            {gameInfo.name}
                        </h1>
                        {!form &&
                            <>
                                <ul className="py-5 my-5 border-y border-gray-600">
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Nickname ingame: </p> <Link className="italic font-semibold" to={`/profile/${Number(thisUser.id)}`}>{gameInfo.nicknameIngame}</Link>
                                    </li>
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Hours played:</p> <p className="italic font-semibold">{gameInfo.hours}</p>
                                    </li>
                                    {gameInfo.rank &&
                                        <li className="flex">
                                            <p className="w-[132px] h-[26px] mr-5">Rank:</p> <p className="italic font-semibold">{gameInfo.rank}</p>
                                        </li>
                                    }
                                    {gameInfo.server &&
                                        <li className="flex">
                                            <p className="w-[132px] h-[26px] mr-5">Server:</p> <p className="italic font-semibold">{gameInfo.server}</p>
                                        </li>
                                    }

                                </ul>

                                <div>
                                    <h4 className="font-bold">Comment: <Link className="text-sm italic font-semibold" to={`/profile/${Number(thisUser.id)}`}>(by {thisUser.username})</Link></h4>
                                    <p className="mt-1 ml-5">{gameInfo.comments}</p>
                                </div>
                            </>
                        }
                        {form && <GameEditForm currentGame={gameInfo} toggleForm={toggle} />}
                    </div>

                    {thisUser.email === email &&
                        <div className="absolute bottom-5 w-1/2 flex justify-center text-xl text-gray-600">
                            <button onClick={toggle} className="px-5 border-r border-gray-600 hover:text-black">Edit</button>
                            <button onClick={() => GameDelete(Number(gameInfo.id))} className="px-5 hover:text-black">Delete</button>
                        </div>
                    }
                </div>

            </div>
        </>
    )
}

export default GameInfo;