import { Comment, Game, Login, Post, ProfileModel } from "../types"
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
    }
    | {
        type: "GET_COMMENTS";
        payload: Comment[];
    }
    |{
        type: "UPDATE_POSTS";
        payload: Post;
    }
    | {
        type: "UPDATE_GAMES";
        payload: Game;
    }
    | {
        type: "UPDATE_PROFILE";
        payload: ProfileModel;
    };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "GET_GAME_LIST":
            return {
                ...state,
                games: {
                    ...action.payload.reduce(
                        (memo, game) => ({ ...memo, [Number(game.id)]: game }), {}),
                    ...state.games
                }
            };
        case "ADD_GAME":
            return {
                ...state,
                games: {
                    ...state.games,
                    [Number(action.payload.id)]: action.payload
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
                    [action.payload.email]: action.payload
                }
            };
        case "ADD_PROFILE":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    [action.payload.email]: action.payload
                }
            };
        case "GET_PROFILES":
            if(action.payload === undefined){
                return {...state};
            }else{
            return {
                ...state,
                profile: {
                    ...action.payload.reduce(
                        (memo, profile) => ({ ...memo, [profile.email]: profile }),
                        {}
                    ),
                    ...state.profile
                }
            };
        }
        case "GET_USERS":
            if(action.payload === undefined){
                return {...state};
            }else{
            return {
                ...state,
                login: {
                    ...action.payload.reduce(
                        (memo, login) => ({ ...memo, [login.email]: login }),
                        {}
                    ),
                    ...state.login
                }
            };
        }
        case "GET_POSTS":
            return{
                ...state,
                posts:{
                    ...action.payload.reduce(
                        (memo, post) => ({ ...memo, [Number(post.id)]: post }),
                        {}
                    ),
                    ...state.posts
                }
            }
        case "ADD_POST":
            return {
                ...state,
                posts: {
                   
                    [Number(action.payload.id)]: action.payload,
                    ...state.posts
                }
            }
            case "GET_COMMENTS":
                return{
                    ...state,
                    comments:{
                        ...action.payload.reduce(
                            (memo, comment) => ({ ...memo, [Number(comment.id)]: comment }),
                            {}
                        ),
                        ...state.comments
                    }
                };
            case "UPDATE_POSTS":
                return {...state,
                posts: {
                    ...state.posts
                }};
            case "UPDATE_GAMES":
                return {...state,
                games: {
                    ...state.games
                }}
                case "UPDATE_PROFILE":

            return {
                ...state,
                profile: {
                    ...state.profile,
                    [action.payload.email]: action.payload
                }
            };
        default:
            return state;
    }
};

