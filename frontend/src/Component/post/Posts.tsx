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
import { Table, Button } from 'react-bootstrap'

interface Props {
    currentUser?: ProfileModel;
}

const Posts: React.FC<Props> = ({ currentUser }) => {
    const [{ posts, profile, comments, email }, dispatch] = useStateValue();
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
            dispatch({ type: "GET_PROFILES", payload: profiles });
        })
        getPosts().then(post => {
            const posts: Post[] = post as Post[];
            posts.sort((a, b) => Number(b.id) - Number(a.id));
            dispatch({ type: "GET_POSTS", payload: posts });
        });

        getComments().then(comment => {
            const comments = comment as Comment[];

            dispatch({ type: "GET_COMMENTS", payload: comments });
        })

    }, [dispatch]);

    const likesPost = (post: Post) => {
        likePost(Number(post.id));
        post.likes = Number(post.likes) + 1;
        dispatch({ type: "ADD_POST", payload: post });
    }

    const dislikesPost = (post: Post) => {
        dislikePost(Number(post.id));
        post.dislikes = Number(post.dislikes) + 1;
        dispatch({ type: "ADD_POST", payload: post });
    }

    const handleDelete = (post: Post) => {
        if (window.confirm(`Are you sure you want to delete post titled ${post.title}?`)) {
            deletePost(Number(post.id));
            allComments.map(comment => {
                if (comment.id === post.id) {
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
        if (myPosts) {
            myPosts.sort((A, B) => Number(B.id) - Number(A.id));

            return (
                <>
                    <ul className="divide-y divide-slate-100">

                        {myPosts.map(post =>
                            <li key={Number(post.id)} className="flex items-start space-x-6 p-6 bg-gray-200">
                                <div className='h-[50px]'>
                                    <h2 className="font-semibold text-slate-900 truncate pr-20">{currentUser.username}</h2>
                                    <h4 className="flex-none w-full mt-2 font-normal">{post.date}</h4>
                                </div>
                                <div>
                                    {currentUser.email === email && !editForm &&
                                        <button onClick={() => toggleDrop(Number(post.id))}>
                                            <span className="material-symbols-outlined">
                                                * * *
                                            </span>
                                        </button>}
                                    {moreDropdown && postID === Number(post.id) &&
                                        <div >
                                            <div className="py-1"><button className="h-8 px-2 py-1 font-semibold rounded-full bg-violet-600 text-white hover:bg-violet-400" onClick={() => toggleDrop(Number(post.id))} >Cancel</button></div>
                                            <div className="py-1"><button className="h-8 px-2 py-1 font-semibold rounded-full bg-violet-600 text-white hover:bg-violet-400" onClick={toggle}>Edit</button></div>
                                            <div className="py-1"><button className="h-8 px-2 py-1 font-semibold rounded-full bg-violet-600 text-white hover:bg-violet-400 hover:text-gray-900" onClick={() => handleDelete(post)}>Delete</button></div>
                                        </div>
                                    }
                                </div>

                                {editForm && postID === Number(post.id) && <td> <EditPostForm currentPost={post} toggleForm={toggle} /></td>}

                                <div >
                                    <h1 className="font-semibold text-slate-900 truncate pr-20">{post.title}</h1>
                                    <p style={contentStyle} className="flex-none w-full mt-2 font-normal">{post.content}</p>
                                </div>
                                <div>

                                    <button className="px-1 text-sm font-medium" onClick={() => likesPost(post)} >Like!</button>
                                    <div className="flex-none w-full mt-1 font-normal">{post.likes} Likes</div>
                                    <button className="px-1 text-sm font-medium" onClick={() => dislikesPost(post)} >Dislike!</button>
                                    <div className="flex-none w-full mt-1 font-normal">{post.dislikes} Dislikes</div>
                                </div>

                                <Comments post={post} />

                            </li>
                        )}

                    </ul>
                </>
            )
        } else {
            return (
                <></>
            )
        }



    } else {
        return (
            <>
                <ul className="divide-y divide-slate-200">
                    {allPosts.map(post =>
                        <li key={Number(post.id)} className="flex items-start space-x-6 p-6 bg-gray-200">
                            <div className='h-[50px]'>
                                <h2 className="font-semibold text-slate-900 truncate pr-20"><Link to={`/profile/${Number(allProfiles.find(prof => Number(prof.id) === Number(post.profileId))?.id)}`}>
                                    {allProfiles.find(prof => Number(prof.id) === Number(post.profileId))?.username}</Link></h2>
                                <h4 className="flex-none w-full mt-2 font-normal">{post.date}</h4>
                            </div>
                            <div >
                                <h1 className="font-semibold text-slate-900 pr-20">{post.title}</h1>
                                <p style={contentStyle} className="flex-none w-full mt-2 font-normal">{post.content}</p>
                            </div>
                            <div>

                                <button className="px-1 text-sm font-medium" onClick={() => likesPost(post)} >Like!</button>
                                <div className="flex-none w-full mt-1 font-normal px-3">{post.likes}</div>
                                <button className="px-1 text-sm font-medium" onClick={() => dislikesPost(post)} >Dislike!</button>
                                <div className="flex-none w-full mt-1 font-normal px-3">{post.dislikes}</div>
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