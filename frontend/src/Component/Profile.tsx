import React from "react";
    import { useStateValue } from "../state/state";
    import { getProfiles } from "../services/profileService";
    import { Comment, Game, Login, Post, ProfileModel } from "../types";
    import { getUsers } from "../services/userService";
    import AddGame from "./AddGame";
    import { getAll } from "../services/gameService";
    import Games from "./Games";
    import ProfileInfo from "./ProfileInfo";
    import AddPost from "./AddPost";
    import { getPosts } from "../services/postService";
    import Posts from "./Posts";
import { getComments } from "../services/commentService";
    
    const Profile: React.FC = () => {
        const [{ profile, email }, dispatch] = useStateValue();
        const [addGame, setAddGame] = React.useState<boolean>(false);
        const [newPost, setNewPost] = React.useState<boolean>(false);
    
        const addNewGame = () => {
            setAddGame(!addGame);
        }
    
        const togglePost = () => {
            setNewPost(!newPost)
        }
    
        React.useEffect(() => {
    
            getProfiles().then(data => {
    
                const profiles: ProfileModel[] = data as ProfileModel[];
                dispatch({ type: "GET_PROFILES", payload: profiles });
            });
            getUsers().then(user => {
                const users: Login[] = user as Login[];
    
                dispatch({ type: "GET_USERS", payload: users });
            });
    
            getAll().then(game => {
                const games: Game[] = game as Game[];
            
                dispatch({ type: "GET_GAME_LIST", payload: games });
            });
    
            getPosts().then(post => {
                const posts: Post[] = post as Post[];
                posts.sort((a, b) => Number(b.id) - Number(a.id));
                dispatch({ type: "GET_POSTS", payload: posts });
            });

            getComments().then(comment => {
                const comments = comment as Comment[];

                dispatch({type: "GET_COMMENTS", payload: comments});
            })
            
            const loggedUserJSON = window.localStorage.getItem('loggedUser');
            if (loggedUserJSON && loggedUserJSON !== undefined) {
                const user = JSON.parse(loggedUserJSON);
                dispatch({ type: "LOGIN", payload: user });
            }
        }, [dispatch]);
    
    
        const user = Object.values(profile).filter(prof => prof.email === email);
    
        if (user.length !== 0) {
            if (addGame) {
                return (
                    <AddGame closeForm={addNewGame} currentUser={user[0]} />
                )
            }
            return (
                <div key={user[0].id} >
    
                    <ProfileInfo currentUser={user[0]}/>
    
                    <div id='game-section' >
                        <div >
                            <h1>Games</h1>
                            <hr ></hr>
                        </div>
                        <div className='flex w-fit'>
                            <Games currentUser={user[0]} />
                            <div >
                                <button onClick={addNewGame} >Add Game</button>
                            </div>
                        </div>
                    </div>
    
                    <div >
                        <div >
                            <h1>Posts</h1>
                            <hr ></hr>
                            <button onClick={togglePost} >New Post</button>
                        </div>
    
                        <div >
                            {newPost && <AddPost currentUser={user[0]} toggleNewPost={togglePost} />}
                        </div>
                        <Posts currentUser={user[0]} />
                    </div>
                </div>
            )
        } else {
            return (<>Loading....</>)
        }
    
    };
    
    export default Profile;
