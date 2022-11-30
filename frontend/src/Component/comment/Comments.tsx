import React from "react";
import { getComments } from "../../services/commentService";
import { getPosts } from "../../services/postService";
import { getProfiles } from "../../services/profileService";
import { useStateValue } from "../../state/state";
import { Comment, Post, ProfileModel } from "../../types";
import AddComment from "./AddComment";

interface Props {
    post: Post;
}

const Comments: React.FC<Props> = ({ post }) => {
    const [{profile,email,comments }, dispatch] = useStateValue();
    const [newComment, setForm] = React.useState<boolean>(true);
    const [showComments, commentArea] = React.useState<boolean>(false);

    const addComment = () => {
        setForm(!newComment)
    }

    const toggleComments = () => {
        commentArea(!showComments)
    }

    React.useEffect(() => {
        getProfiles().then(data => {

            const profiles: ProfileModel[] = data as ProfileModel[];
            dispatch({ type: "GET_PROFILES", payload: profiles });
        });

        getPosts().then(post => {
            const posts: Post[] = post as Post[];
            posts.sort((a, b) => Number(b.id) - Number(a.id));
            dispatch({ type: "GET_POSTS", payload: posts });
        });

        getComments().then(comment => {
            const comments: Comment[] = comment as Comment[];
            dispatch({type: "GET_COMMENTS", payload: comments})
        });

    }, [dispatch]);
 
    const postComments = Object.values(comments).filter(comm => Number(comm.postId) === Number(post.id));
    const currentUser = Object.values(profile).find(prof => prof.email === email) as ProfileModel;

    return (
        <>
            <div>
                <div className='flex'>
                    {!showComments &&
                        <button onClick={toggleComments} >Show {postComments.length} Comments</button>
                    }
                    {showComments &&
                        <button onClick={toggleComments}  >Hide Comments</button>
                    }
                </div>
            </div>
           <div> {showComments &&
                <div className='ml-10 h-fit'>
                    <AddComment currentUser={currentUser} thisPost={post} toggleForm={addComment} />
                    <div>
                    {postComments.map(comment =>
                        <div key={comment.id} >
                            <div>
                                <div className='flex'>
                                    <h4 >{Object.values(profile).find(prof => Number(prof.id) === Number(comment.postId))?.username}</h4>
                                    <p>{comment.createdAt?.replace("T", " | ").slice(0, -5)}</p>
                                </div>
                                <div>
                                <p >
                                    {comment.comment}
                                </p>
                                </div>
                            </div>
                            
                        </div>)
                    }</div>
                </div>
            }
            </div>
        </>
    )
}

export default Comments;