import React, { createContext, useContext, useReducer } from "react";
import { Game, Login, ProfileModel, Post, Comment } from "../types";
import { Action } from "./reducer";

export interface State {
    games: { [GameId: number]: Game }
    profile: { [ProfileId: number]: ProfileModel}
    email: string,
    login: {[Email: string]: Login},
    posts: {[PostID: number] : Post},
    comments: {[id: number] : Comment}
}

const initialState: State = {
    games: {},
    profile: {},
    email: "",
    login: {},
    posts: {},
    comments: {}
}

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
    initialState,
    () => initialState
]);

type StateProviderProps = {
    reducer: React.Reducer<State, Action>;
    children: React.ReactElement;
};


export const StateProvider = ({
    reducer,
    children
}: StateProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};
export const useStateValue = () => useContext(StateContext);