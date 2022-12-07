import React from "react";
import { addPost, getPosts } from "../../services/postService";
import { useStateValue } from "../../state/state";
import { Post, ProfileModel } from "../../types";
import { rootNavigate } from "../router/CustomRouter";

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

    const [, dispatch] = useStateValue();

    const handlePost = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const title = e.currentTarget.elements.title.value;
        const content = e.currentTarget.elements.content.value;
        const date = new Date().toUTCString();

        if(title && content){

            const newPost: Post = {
                title: title,
                content: content,
                profileId: Number(currentUser.id),
                date: date
            }
    
            addPost(newPost).then(post => {
                const resPost = post as Post
                console.log(resPost)
                getPosts().then(posts => {
                    const allPosts = posts as Post[]
                    dispatch({type: "GET_POSTS", payload: allPosts})
                })
            });
            
            e.currentTarget.elements.title.value = "";
            e.currentTarget.elements.content.value = "";
            
            toggleNewPost();
            rootNavigate('/profile');
        }
        else{
            window.alert("You have to give title and content for post")
        }
    }
    return (
        <div id='addPost' className=''>
            <form onSubmit={handlePost}>
                <div className='flex flex-col'>
                    <input id="title" name="title" placeholder="Title"  className='break-words bg-lightBackground px-2 py-1 text-xl font-bold mb-2 ml-2 mr-2 rounded-md'/>
                    <textarea name="content" id="content" cols={50} rows={5} placeholder="Post Content..."  className='bg-lightBackground rounded-md h-fit mr-2 px-2 py-1 ml-2 mb-2'/>
                    <button  type="submit" className='rounded-full bg-primary text-sm px-4 py-2 w-24 text-white hover:ring-4 uppercase font-semibold ml-2'>Post!</button>
                    <br/>
                </div>
            </form>
        </div>
    );
}

export default AddPost;