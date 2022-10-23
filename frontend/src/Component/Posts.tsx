import React from "react";
import { useStateValue } from "../state/state";
import { Post, ProfileModel, Comment } from "../types";
import Comments from "./Comments";
import CSS from 'csstype';
import { likePost, dislikePost, getPosts } from '../services/postService';
import { getComments } from "../services/commentService";
import { Link } from "react-router-dom";

interface Props {
    currentUser?: ProfileModel;
}

const Posts: React.FC<Props> = ({ currentUser }) => {
    const [{posts, profile}, dispatch] = useStateValue();

    const allPosts = Object.values(posts).concat();
    allPosts.sort((A, B) => Number(B.id) - Number(A.id));
    
    const allProfiles = Object.values(profile).concat();

    React.useEffect(() => {

        getPosts().then(post => {
            const posts: Post[] = post as Post[];
            posts.sort((a, b) => Number(b.id) - Number(a.id));
            dispatch({ type: "GET_POSTS", payload: posts });
        });

        getComments().then(comment => {
            const comments = comment as Comment[];

            dispatch({type: "GET_COMMENTS", payload: comments});
        })
        
    }, [dispatch]);

    const likesPost = (post: Post) => {
        likePost(Number(post.id));
        post.likes = Number(post.likes)+1;
        dispatch({type: "ADD_POST", payload: post});
        //window.location.reload();
    }

    const dislikesPost = (post: Post) => {
        dislikePost(Number(post.id));
        post.dislikes = Number(post.dislikes)+1;
        dispatch({type: "ADD_POST", payload: post});
        //window.location.reload();
    }

    const contentStyle: CSS.Properties = {
        whiteSpace: "pre-line"
    }

    if (currentUser) {
        const myPosts = currentUser?.posts as Post[];
        if(myPosts){
             myPosts.sort((A, B) => Number(B.id) - Number(A.id));

             return (
                <>
                    <ul>
                        {myPosts.map(post =>
                            <li key={Number(post.id)} className="flex">
                                <div >
                                    <h2 >{currentUser?.username}</h2>
                                    <h4 >{post.createdAt?.replace("T", " | ").slice(0, -5)}</h4>
                                </div>
                                <div >
                                    <h1 >{post.title}</h1>
                                    <p style={contentStyle}>{post.content}</p>
                                </div>
                                <div>
    
                                    <button onClick={() => likesPost(post)} >Like!</button>
                                    <div>{post.likes}</div>
                                    <button onClick={() => dislikesPost(post)} >Dislike!</button>
                                    <div>{post.dislikes}</div>
                                </div>
                                <Comments post={post} />
                            </li>
                        )}
                    </ul>
                </>
            )
        }else{
            return(
                <></>
            )
        }
   
        
        
    } else {
        return (
            <>
                <ul>
                    {allPosts.map(post =>
                        <li key={Number(post.id)} className="flex">
                            <div >
                            <h2 ><Link to={`/profile/${Number(allProfiles.find(prof => Number(prof.id) === Number(post.profileId))?.id)}`}>
                                {allProfiles.find(prof => Number(prof.id) === Number(post.profileId))?.username}</Link></h2>     
                                <h4 >{post.createdAt?.replace("T", " | ").slice(0, -5)}</h4>
                            </div>
                            <div >
                                <h1 >{post.title}</h1>
                                <p style={contentStyle}>{post.content}</p>
                            </div>
                            <div>

                                <button onClick={() => likesPost(post)} >Like!</button>
                                <div>{post.likes}</div>
                                <button onClick={() => dislikesPost(post)} >Dislike!</button>
                                <div>{post.dislikes}</div>
                            </div>
                            <Comments post={post} />
                        </li>
                    )}
                </ul>
            </>
        )
    }
}

export default Posts;