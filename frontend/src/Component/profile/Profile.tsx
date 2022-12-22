import React from "react";
import { useStateValue } from "../../state/state";
import { getProfiles } from "../../services/profileService";
import { Comment, Game, Login, Post, ProfileModel } from "../../types";
import { getUsers } from "../../services/userService";
import AddGame from "../game/AddGame";
import { getAll } from "../../services/gameService";
import Games from "../game/Games";
import ProfileInfo from "./ProfileInfo";
import AddPost from "../post/AddPost";
import { getPosts } from "../../services/postService";
import Posts from "../post/Posts";
import { getComments } from "../../services/commentService";
import { Link } from "react-router-dom";

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

            dispatch({ type: "GET_COMMENTS", payload: comments });
        })

        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON && loggedUserJSON !== undefined) {
            const user = JSON.parse(loggedUserJSON);
            dispatch({ type: "LOGIN", payload: user });
        }
    }, [dispatch]);


    const user = Object.values(profile).find(prof => prof.email === email);

    if (user) {
        if (addGame) {
            return (
                <AddGame closeForm={addNewGame} currentUser={user} />
            )
        }
        return (
            <div>
                <div className='absolute top-[145px] right-[2.5rem] text-gray-400 z-10'>
                    <Link to="/profile/edit"><button className="uppercase font-semibold">Edit</button></Link>
                </div>
                <div key={user.id} className='min-h-[calc(100vh-65px)] z-10 bg-darkBackground text-gray-200'>

                    <ProfileInfo currentUser={user} />

                    <div id='game-section' className='px-10 pb-10 pt-8 bg-white text-gray-600 overflow-x-auto'>
                        <div className='font-bold text-3xl pb-7 w-full flex w-full'>
                            <h1>Games</h1>
                            <hr className='border-2 border-gray-300 w-full mt-5 ml-5 rounded-md'></hr>
                        </div>
                        <div className='flex w-fit'>
                            <Games currentUser={user} />
                            <div className='ring-4 hover:ring-4 hover:ring-primary hover:ring-offset-4 rounded-lg ring-darkBackground flex flex-col h-80 w-60 mx-2 text-white bg-darkBackground animate__animated animate__fadeIn'>
                                <button onClick={addNewGame} className='rounded-lg w-full h-full font-bold text-7xl bg-darkBackground text-white hover:bg-primary'>+</button>
                            </div>
                        </div>
                    </div>

                    <div className='px-10 py-10'>
                        <div className='font-bold text-3xl pb-7 flex w-full'>
                        <h1 className='w-fit'>Your&nbsp;Posts</h1>
                            <hr className='border-2 border-gray-300 w-full mt-5 mx-5 rounded-md'></hr>
                            <div className="flex items-start space-x-3 p-3">
                            {!newPost && <button onClick={togglePost} className='rounded-full bg-primary text-sm px-4 py-2 w-28 hover:ring-4'>New Post</button> }
                            {newPost && <button onClick={togglePost} className='rounded-full bg-red-500 text-sm px-4 py-2 w-28 hover:ring-4'>Cancel</button> }
                    </div>
                        </div>
                        <div className='text-gray-600'>
                            {newPost && <AddPost currentUser={user} toggleNewPost={togglePost} />}
                        </div>
                        <Posts currentUser={user} />
                    </div>
                </div>
            </div>
        )
    } else {
        return (<>Loading....</>)
    }

};

export default Profile;
