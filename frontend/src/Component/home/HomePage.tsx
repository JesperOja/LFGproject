import React from "react"
import { Link } from "react-router-dom";
import { getAll } from "../../services/gameService";
import { getPosts } from "../../services/postService";
import { getProfiles } from "../../services/profileService";
import { getUsers } from "../../services/userService";
import { useStateValue } from "../../state/state";
import { Comment, Post, ProfileModel, Login } from "../../types";
import Comments from "../comment/Comments";
import CSS from 'csstype';
import { getComments } from "../../services/commentService";
import Posts from "../post/Posts";

const HomePage: React.FC = () => {
    const [{ email, profile }, dispatch] = useStateValue();

    
    const thisUser = Object.values(profile).concat();

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

    const contentStyle: CSS.Properties = {
        whiteSpace: "pre-line"
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Home Page
            </h1>
            <div>
                Posts:
                <Posts currentUser={undefined} />
            </div>
        </>
    )
}

export default HomePage;