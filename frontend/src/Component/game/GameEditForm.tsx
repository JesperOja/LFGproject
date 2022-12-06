import React from "react";
import { editGame, getAll } from "../../services/gameService";
import { useStateValue } from "../../state/state";
import { Game } from "../../types";
import { rootNavigate } from "../router/CustomRouter";

interface FormElements extends HTMLFormControlsCollection {
    hours: HTMLInputElement;
    rank: HTMLInputElement;
    nick: HTMLInputElement;
    server: HTMLInputElement;
    comment: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface Props {
    currentGame: Game;
    toggleForm: () => void;
}

const GameEditForm: React.FC<Props> = ({ currentGame, toggleForm }) => {
    const [, dispatch] = useStateValue();

    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const hours = Number(e.currentTarget.elements.hours.value);
        const rank = e.currentTarget.elements.rank.value;
        const server = e.currentTarget.elements.server.value;
        const nick = e.currentTarget.elements.nick.value;
        const comment = e.currentTarget.elements.comment.value;

        const updatedGame: Game = {
            id: currentGame.id,
            name: currentGame.name,
            hours: hours,
            rank: rank,
            server: server,
            nicknameIngame: nick,
            comments: comment,
            profileId: currentGame.profileId
        }

        editGame(updatedGame).then(mes => {
            console.log(mes);
            getAll().then(game => {
                const games: Game[] = game as Game[];

                dispatch({ type: "GET_GAME_LIST", payload: games });
            });
        });

        
        rootNavigate(`/profile`);
        toggleForm();
        dispatch({type: "UPDATE_GAME", payload: updatedGame});
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul >
                <li className="flex">
                    <p className="w-[153px]">Nickname ingame: </p> <input id="nick" name="nick"  defaultValue={currentGame.nicknameIngame} placeholder="Nickname (ingame)" />
                </li>
                <li className="flex">
                    <p className="w-[132px] mr-5">Hours played:</p> <input id="hours" name="hours" type="number" defaultValue={currentGame.hours} placeholder="Hours played" />
                </li>
                <li className="flex">
                    <p className="w-[132px] mr-5">Rank:</p> <input id="rank" name="rank" defaultValue={currentGame.rank} placeholder="Rank" />
                </li>
                <li className="flex">
                    <p className="w-[132px] mr-5">Server:</p> <input id="server" name="server"  defaultValue={currentGame.server} placeholder="Server" />
                </li>
            </ul>

            <div >
                <h4 className="font-bold">Comment:</h4>
                <p className="mt-1"><textarea id="comment" name="comment"  defaultValue={currentGame.comments} placeholder="Comments " rows={4} cols={40} /></p>
            </div>

            <button type="submit" >Update</button>
        </form>
    )
}

export default GameEditForm;