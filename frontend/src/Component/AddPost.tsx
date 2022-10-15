import React from "react";
import { addPost, getPosts } from "../services/postService";
import { useStateValue } from "../state/state";
import { Post, ProfileModel } from "../types";

interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    content: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface Props {
    currentUser: ProfileModel
    toggleNewPost: () => void;
}

const AddPost: React.FC<Props> = ({ currentUser, toggleNewPost }) => {

    const [{posts}, dispatch] = useStateValue();

    const handlePost = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const date = new Date();
        const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        const title = e.currentTarget.elements.title.value;
        const content = e.currentTarget.elements.content.value;
        const id = Object.values(posts).concat().length+5000;

        const newPost: Post = {
            id: id,
            title: title,
            createDate: today,
            content: content,
            profileId: Number(currentUser.id)
        }

        addPost(newPost);
        dispatch({ type: "ADD_POST", payload: newPost });

        getPosts().then(post => {
            const posts: Post[] = post as Post[];
            posts.sort((a, b) => Number(b.id) - Number(a.id));
            dispatch({ type: "GET_POSTS", payload: posts });
        })

        e.currentTarget.elements.title.value = "";
        e.currentTarget.elements.content.value = "";

        toggleNewPost();
    }
    return (
        <div id='addPost' className=''>
            <form onSubmit={handlePost}>
                <div className='flex flex-col'>
                    <input id="title" name="title" placeholder="Title"  />
                    <textarea name="content" id="content" cols={50} rows={5} placeholder="Post Content..."  />
                    <button  type="submit">Post!</button>
                    <br/>
                </div>
            </form>
        </div>
    );
}

export default AddPost;