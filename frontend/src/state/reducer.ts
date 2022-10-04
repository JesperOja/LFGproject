import { Game, Login, Post, ProfileModel } from "../types"
import { State } from "./state";


export type Action =
    | {
        type: "GET_GAME_LIST";
        payload: Game[];
    }
    | {
        type: "ADD_GAME";
        payload: Game;
    }
    | {
        type: "LOGIN";
        payload: string;
    }
    | {
        type: "LOGOUT";
        payload: string;
    }
    | {
        type: "ADD_LOGIN";
        payload: Login;
    }
    | {
        type: "GET_USERS";
        payload: Login[];
    }

    | {
        type: "ADD_PROFILE";
        payload: ProfileModel;
    }
    | {
        type: "GET_PROFILES";
        payload: ProfileModel[];
    }
    | {
        type:"GET_POSTS";
        payload: Post[];
    }
    | {
        type:"ADD_POST";
        payload: Post;
    };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "GET_GAME_LIST":
            return {
                ...state,
                games: {
                    ...action.payload.reduce(
                        (memo, game) => ({ ...memo, [game.GameName]: game }), {}),
                    ...state.games
                }
            };
        case "ADD_GAME":
            return {
                ...state,
                games: {
                    ...state.games,
                    [action.payload.GameName]: action.payload
                }
            };
        case "LOGIN":
            return {
                ...state,
                email: action.payload

            };
        case "LOGOUT":
            return {
                ...state,
                email: action.payload
            };
        case "ADD_LOGIN":
            return {
                ...state,
                login: {
                    ...state.login,
                    [action.payload.Email]: action.payload
                }
            };
        case "ADD_PROFILE":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    [action.payload.Email]: action.payload
                }
            };
        case "GET_PROFILES":
            return {
                ...state,
                profile: {
                    ...action.payload.reduce(
                        (memo, profile) => ({ ...memo, [profile.Email]: profile }),
                        {}
                    ),
                    ...state.profile
                }
            };
        case "GET_USERS":
            return {
                ...state,
                login: {
                    ...action.payload.reduce(
                        (memo, login) => ({ ...memo, [login.Email]: login }),
                        {}
                    ),
                    ...state.login
                }
            }
        case "GET_POSTS":
            return{
                ...state,
                posts:{
                    ...action.payload.reduce(
                        (memo, post) => ({ ...memo, [post.Title]: post }),
                        {}
                    ),
                    ...state.posts
                }
            }
        case "ADD_POST":
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.payload.Title]: action.payload
                }
            }
        default:
            return state;
    }
};

