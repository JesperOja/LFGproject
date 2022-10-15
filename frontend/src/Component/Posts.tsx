import React from "react";
import { useStateValue } from "../state/state";
import { ProfileModel } from "../types";

interface Props {
    currentUser: ProfileModel;
}

const Posts: React.FC<Props> = ({ currentUser }) => {
    const [{ posts }] = useStateValue();

    const myPosts = Object.values(posts).filter(post => Number(post.profileId) === Number(currentUser.id));
    myPosts.sort((A,B) => B.id - A.id);
    if (myPosts) {
        return (
            <>
                <ul>
                    {myPosts.map(post =>
                        <li key={Number(post.id)} className="flex">
                            <div >
                                <h2 >{currentUser.username}</h2>
                                <h4 >{post.createDate}</h4>
                            </div>
                            <div >
                                <h1 >{post.title}</h1>
                                <p>{post.content}</p>
                            </div>
                            
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
}

export default Posts;