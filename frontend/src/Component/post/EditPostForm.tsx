import React from "react";
import { editPost, getPosts } from "../../services/postService";
import { useStateValue } from "../../state/state";
import { Post } from "../../types";
import { rootNavigate } from "../router/CustomRouter";

interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    content: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface Props {
    currentPost: Post;
    toggleForm: () => void;
}


const EditPostForm: React.FC<Props> = ({currentPost, toggleForm}) => {
    const [, dispatch] = useStateValue();

    const [showEditButton, editButton] = React.useState<boolean>(false);
    const [textField, textFieldDispatch] = React.useState<string>("");
    const [inputField, inputFieldDispatch] = React.useState<string>("");

    const maxPostLenght = 1024;
    const maxTitleLenght = 45;

    const handleSubmit = async (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const title = e.currentTarget.elements.title.value;
        const content = e.currentTarget.elements.content.value;

        const updatedPost: Post = {
            title: title,
            content: content,
            id: Number(currentPost.id),
            profileId: Number(currentPost.profileId),
            date: currentPost.date,
            likes: currentPost.likes,
            dislikes: currentPost.dislikes
        }

        await editPost(updatedPost).then(post => {
            const editedPost = post as Post
            dispatch({type: "UPDATE_POST", payload: editedPost});
        dispatch({type: "UPDATE_POSTS", payload: editedPost});
        });

        rootNavigate("/profile");
        toggleForm();
    }

    const activateTextAreaChange = () => {
        editButton(true);
    }

    const deactivateTextAreaChange = () => {
        textFieldDispatch("");
        inputFieldDispatch("");
        editButton(false);
        toggleForm();
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className='flex flex-col mb-5'>
                    <input name="title" id="title"  onChange={(e) => inputFieldDispatch(e.target.value)} onFocus={activateTextAreaChange} defaultValue={currentPost.title} placeholder="Title" maxLength={maxTitleLenght} className='break-words bg-lightBackground px-2 py-1 text-xl font-bold mb-2 rounded-md'/>
                    <textarea name="content" id="content"  defaultValue={currentPost.content} onChange={(e) => textFieldDispatch(e.target.value)} onFocus={activateTextAreaChange} placeholder="Content" rows={4} cols={40} maxLength={maxPostLenght} className='p-2 bg-lightBackground rounded-md'/>
                    <p >{textField.length}/{maxPostLenght}</p>
                </div>
                {showEditButton &&
                    <div >
                        <button onClick={deactivateTextAreaChange} className='uppercase text-sm w-24 px-4 py-2 hover:text-white rounded-full hover:bg-gray-500'>Cancel</button>
                        <button type="submit" className='rounded-full bg-primary text-sm px-4 py-2 w-24 text-white hover:ring-4 px-4 py-2 uppercase font-semibold'>Edit</button>
                    </div>
                }
            </form>
        </>
    )
}

export default EditPostForm;