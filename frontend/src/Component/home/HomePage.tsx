import React from "react"
import { getPosts } from "../../services/postService";
import { getProfiles } from "../../services/profileService";
import { getUsers } from "../../services/userService";
import { useStateValue } from "../../state/state";
import { Comment, Post, ProfileModel, Login } from "../../types";
import { getComments } from "../../services/commentService";
import Posts from "../post/Posts";

const HomePage: React.FC = () => {
    const [, dispatch] = useStateValue();

    React.useEffect(() => {
        getProfiles().then(data => {

            const profiles: ProfileModel[] = data as ProfileModel[];
            dispatch({ type: "GET_PROFILES", payload: profiles });
        });
        getUsers().then(user => {
            const users: Login[] = user as Login[];

            dispatch({ type: "GET_USERS", payload: users });
        });

        getComments().then(comment => {
            const comments = comment as Comment[];

            dispatch({type: "GET_COMMENTS", payload: comments});
        })

        getPosts().then(post => {
            const posts: Post[] = post as Post[];
            posts.sort((a, b) => Number(b.id) - Number(a.id));
            dispatch({ type: "GET_POSTS", payload: posts });
        })

        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON && loggedUserJSON !== undefined) {
            const user = JSON.parse(loggedUserJSON);
            dispatch({ type: "LOGIN", payload: user });
        }
    }, [dispatch]);

    return (
        <div className='bg-darkBackground min-h-[calc(100vh-65px)] p-10 text-gray-200'>
            <div className='font-bold text-3xl flex w-full'>
                <h1>Feed</h1>
                <hr className='border-2 border-gray-300 w-full mt-5 mx-5 rounded-md'></hr>
            </div>
            <hr className='w-full border-gray-700 mt-5 '></hr>
            <Posts currentUser={undefined} />
        </div>
    )
}

export default HomePage;