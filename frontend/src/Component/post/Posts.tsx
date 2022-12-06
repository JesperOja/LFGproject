import React from "react";
import { useStateValue } from "../../state/state";
import { Post, ProfileModel, Comment } from "../../types";
import Comments from "../comment/Comments";
import CSS from 'csstype';
import { likePost, dislikePost, getPosts, deletePost } from '../../services/postService';
import { deleteComment, getComments } from "../../services/commentService";
import { Link } from "react-router-dom";
import { getProfiles } from "../../services/profileService";
import EditPostForm from "./EditPostForm";

interface Props {
    currentUser?: ProfileModel;
}

const Posts: React.FC<Props> = ({ currentUser }) => {
    const [{posts, profile, comments, email}, dispatch] = useStateValue();
    const [editForm, toggleForm] = React.useState<boolean>(false);
    const [moreDropdown, toggleDropdown] = React.useState<boolean>(false);
    const [postID, setPostID] = React.useState<number>(0)

    const toggle = () => {
        toggleForm(!editForm);
    }

    const toggleDrop = (id: number) => {
        toggleDropdown(!moreDropdown);
        if (editForm) {
            toggleForm(!editForm);
        }
        setPostID(id);
    }

    const allPosts = Object.values(posts).concat();
    allPosts.sort((A, B) => Number(B.id) - Number(A.id));
    const allComments = Object.values(comments).concat();
    const allProfiles = Object.values(profile).concat();

    React.useEffect(() => {

        getProfiles().then(prof => {
            const profiles = prof as ProfileModel[];
            dispatch({type:"GET_PROFILES", payload: profiles});
        })
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
    }

    const dislikesPost = (post: Post) => {
        dislikePost(Number(post.id));
        post.dislikes = Number(post.dislikes)+1;
        dispatch({type: "ADD_POST", payload: post});
    }

    const handleDelete = (post: Post) => {
        if (window.confirm(`Are you sure you want to delete post titled ${post.title}?`)) {
            deletePost(Number(post.id));
            allComments.map(comment => {
                if(comment.id === post.id){
                    deleteComment(Number(comment.id));
                }
            })
            window.location.reload();
        }
    }

    const contentStyle: CSS.Properties = {
        whiteSpace: "pre-line"
    }

    if (currentUser) {
        const myPosts = allPosts.filter(post => Number(post.profileId) === Number(currentUser.id));
        if(myPosts){
             myPosts.sort((A, B) => Number(B.id) - Number(A.id));

             return (
                <>
                    <ul>
                        {myPosts.map(post =>
                            <li key={Number(post.id)} className="flex">
                                <div className='flex h-[50px]'>
                                            <h2 >{currentUser.username}</h2>
                                            <h4 >{post.date}</h4>
                                           {currentUser.email === email &&  !moreDropdown && !editForm &&
                                           <button onClick={() => toggleDrop(Number(post.id))}>
                                                <span className="material-symbols-outlined">
                                                    Options
                                                </span>
                                            </button>}
                                            { moreDropdown && postID === Number(post.id) &&
                                                <div >
                                                    <button onClick={() => toggleDrop(Number(post.id))} >Cancel</button>
                                                    <button onClick={toggle}>Edit</button>
                                                    <button onClick={() => handleDelete(post)}>Delete</button>
                                                </div>
                                            }
                                        </div>

                                        {editForm && postID === Number(post.id) && <EditPostForm currentPost={post} toggleForm={toggle} />}

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
                                <h4 >{post.date}</h4>
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