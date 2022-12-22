import React from "react";
import { addComment, getComments } from "../../services/commentService";
import { useStateValue } from "../../state/state";

import { Comment, Post, ProfileModel } from "../../types";


interface FormElements extends HTMLFormControlsCollection {
    comment: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface Props {
    thisPost: Post;
    toggleForm: () => void;
    currentUser: ProfileModel
}

const AddComment: React.FC<Props> = ({thisPost, currentUser, toggleForm}) => {
    
    const [, dispatch] = useStateValue();
    const [showCommentButton, commentButton] = React.useState<boolean>(false);
    const [textField, textFieldDispatch] = React.useState<string>("");

    const maxPostLenght = 500;
    
    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const Comment = e.currentTarget.elements.comment.value;
        
        const newComment: Comment = {
            
            postId: Number(thisPost.id),
            comment: Comment,
            posterId: Number(currentUser.id),
        }
        addComment(newComment).then(mes => {
            console.log(mes);
            getComments().then(comment => {
                const comments:Comment[] = comment as Comment[]
                dispatch({type:"GET_COMMENTS", payload: comments})
            })
        });

        toggleForm();
        deactivateTextAreaChange();
        
    }

    const activateTextAreaChange = () => {
        commentButton(true);
    }

    const deactivateTextAreaChange = () => {
        textFieldDispatch("");
        commentButton(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='mt-5 w-[400px] mb-5'>
                <div className='flex h-fit'>
                    
                    <textarea id="comment" name="comment" onChange={(e) => textFieldDispatch(e.target.value)} value={textField} onFocus={activateTextAreaChange} placeholder="Comment" rows={1} cols={40} maxLength={maxPostLenght} className='bg-lightBackground rounded-md h-fit px-2 py-1 ml-2 '/>
                </div>

                <div className='w-fit ml-20'>
                    {showCommentButton &&
                        <>
                            <button onClick={deactivateTextAreaChange} className='uppercase rounded-full text-gray-600 px-3 py-2 hover:text-white hover:bg-gray-500'>Cancel</button>
                            <button type='submit' className='uppercase rounded-full bg-primary text-sm px-3 py-2 hover:ring-4'>Comment</button>
                        </>
                    }
                </div>
            </form>
        </>
    )
}

export default AddComment;