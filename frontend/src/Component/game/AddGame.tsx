import React from "react";
import { addGame, getAll } from "../../services/gameService";
import { useStateValue } from "../../state/state";
import { Game, ProfileModel } from '../../types';

interface FormElements extends HTMLFormControlsCollection {
    GameName: HTMLInputElement;
    NicknameIngame: HTMLInputElement;
    HoursPlayed: HTMLInputElement;
    Rank: HTMLInputElement;
    Server: HTMLInputElement;
    Comment: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface Props {
    closeForm: () => void;
    currentUser: ProfileModel;
}

const AddGame: React.FC<Props> = ({ closeForm, currentUser }) => {
    const [, dispatch] = useStateValue();

    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const name = e.currentTarget.elements.GameName.value;
        const nick = e.currentTarget.elements.NicknameIngame.value;
        const hours = Number(e.currentTarget.elements.HoursPlayed.value);
        const rank = e.currentTarget.elements.Rank.value;
        const server = e.currentTarget.elements.Server.value;
        const comment = e.currentTarget.elements.Comment.value;

        const newGame: Game = {
            name: name,
            nicknameIngame: nick,
            hours: hours,
            rank: rank,
            server: server,
            comments: comment,
            profileId: Number(currentUser.id)
        }


        addGame(newGame).then(game => {
            const gameNew = game as Game;
            dispatch({ type: "UPDATE_GAMES", payload: gameNew });
            getAll().then(games => {
                const allGames = games as Game[];
                dispatch({ type: "GET_GAME_LIST", payload: allGames });
            })
        });

        closeForm();
    }
    const handleCancel = () => {
        closeForm();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="w-screen h-full bg-darkBackground min-h-[calc(100vh-65px)] overflow-clip">

                    <div className="flex md:w-[800px] lg:w-[1000px] 2xl:w-[1100px] mx-auto pt-20 relative z-10 drop-shadow-lg">
                        <div className="w-1/2 min-h-[800px] rounded-l-lg bg-primary flex justify-center">
                            <h4 className="text-4xl font-bold my-auto uppercase text-gray-300">[game cover]</h4>
                        </div>
                        <div className="w-1/2 text-gray-600 bg-lightBackground rounded-r-lg">
                            <div className="m-10">
                                <h1 className="text-4xl font-bold">
                                    <input name='GameName' id="GameName" className="w-full rounded-md px-2 py-1 bg-darkBackground" placeholder="Game name" />
                                </h1>
                                <ul className="py-5 my-5 border-y border-gray-600">
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Nickname ingame: </p> <input name='NicknameIngame' id="NicknameIngame" className="font-semibold px-2 bg-darkBackground rounded-t-md w-[calc(100%-153px)] border-b-2 border-lightBackground" placeholder="Nickname Ingame" />
                                    </li>
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Hours played:</p> <input name='HoursPlayed' id="HoursPlayed" className="font-semibold px-2 bg-darkBackground w-[calc(100%-153px)] border-b-2 border-lightBackground" placeholder="Hours Played" />
                                    </li>
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Rank:</p> <input name='Rank' id='Rank' className="font-semibold px-2 bg-darkBackground w-[calc(100%-153px)] border-b-2 border-lightBackground" placeholder="Rank (optional)" />
                                    </li>
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Server:</p> <input name="Server" id="Server" className="font-semibold px-2 bg-darkBackground rounded-b-md w-[calc(100%-153px)]" placeholder="Server you play (optional)" />
                                    </li>

                                </ul>

                                <div className="border-b pb-5 border-gray-600">
                                    <h4 className="font-bold">Comment:</h4>
                                    <textarea name="Comment" rows={4} cols={40} id="Comment" placeholder="Comments about the game (optional)" className="mt-1 px-5 bg-darkBackground rounded-md w-full" />
                                </div>

                                <div className="w-full justify-end flex">
                                    <button onClick={handleCancel} className="mt-5 text-gray-300 text-sm px-4 py-2 w-24 hover:text-white">Cancel</button>
                                    <button type='submit' className="mt-5 rounded-full bg-primary text-white text-sm px-4 py-2 w-24 hover:ring-4">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default AddGame;