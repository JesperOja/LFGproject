import React from "react";
import { useStateValue } from "../state/state";
import { ProfileModel } from "../types";

interface Props {
    currentUser: ProfileModel
}

const Posts: React.FC<Props> = ({currentUser}) => {
    const [{posts}] = useStateValue();

    const myPosts = Object.values(posts).filter(post => Number(post.profileId) === Number(currentUser.id));
    if(myPosts){
        return (
        <>
            <ul>
                {myPosts.map(post =>
                    <li key={post.id}>Title: {post.title}, Content: {post.content}</li>
                    )}
            </ul>
        
        </>
    )
    }else{
        return(
            <></>
        )
    }
    
}

export default Posts;