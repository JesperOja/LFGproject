import React from "react";
import { updateProfile } from "../../services/profileService";
import { editUser } from "../../services/userService";
import { useStateValue } from "../../state/state";
import { ProfileModel, Login, Comment } from "../../types";
import { deletePost } from "../../services/postService";
import { deleteGame } from "../../services/gameService";
import { rootNavigate } from "../router/CustomRouter";
import { deleteUser } from "../../services/userService";
import { deleteProfile } from "../../services/profileService";
import { Game, Post } from "../../types";
import { deleteComment } from "../../services/commentService";

interface FormElements extends HTMLFormControlsCollection {
    password: HTMLInputElement;
    username: HTMLInputElement;
    firstname: HTMLInputElement;
    lastname: HTMLInputElement;
    age: HTMLInputElement;
    discord: HTMLInputElement;
    confirm_password: HTMLInputElement;
    avatar: HTMLInputElement;
    currentPassword: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface Props {
    currentUser: ProfileModel;
}

const EditProfileForm: React.FC<Props> = ({ currentUser }) => {
    const [editPassword, toggleEdit] = React.useState<boolean>(false);
    const [{ login, posts, games, comments }, dispatch] = useStateValue();

    const thisUser = Object.values(login).find(u => u.email === currentUser.email) as Login

    const removeProfile = () => {
        if (window.confirm(`Are you sure you want to remove your profile, note that this action will remove your logging info as well?`)) {
            const myPosts = Object.values(posts).filter(post => Number(post.profileId) === Number(currentUser.id)) as Post[];
            const myComments = Object.values(comments).filter(comment => Number(comment.posterId) === Number(currentUser.id)) as Comment[]
            const myGames = Object.values(games).filter(game => Number(game.profileId) === Number(currentUser.id)) as Game[];

            myComments.forEach(comment => {
                deleteComment(Number(comment.id));
            })
            myPosts.forEach(post => {
                deletePost(Number(post.id));
            })

            myGames.forEach(game => {
                deleteGame(Number(game.id))
            })


            deleteProfile(Number(currentUser.id));
            deleteUser(thisUser.email);

            window.localStorage.clear();
            dispatch({ type: "LOGOUT", payload: "" });
            rootNavigate("/login");
            window.location.reload();
        }
        else{
            rootNavigate("/profile")
        }
    }

    const togglePasswordEdit = () => {
        toggleEdit(!editPassword);
    }

    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const username = e.currentTarget.elements.username.value;
        const firstname = e.currentTarget.elements.firstname.value;
        const lastname = e.currentTarget.elements.lastname.value;
        const age = Number(e.currentTarget.elements.age.value);
        const discord = e.currentTarget.elements.discord.value;

        const editedProfile: ProfileModel = {
            id: currentUser.id,
            username: username,
            firstname: firstname,
            lastname: lastname,
            age: age,
            discord: discord,
            email: currentUser.email,
            joiningDate: currentUser.joiningDate
        }

        const currentPassword = e.currentTarget.elements.currentPassword.value;
        const password = e.currentTarget.elements.password.value;
        const confirmPassword = e.currentTarget.elements.confirm_password.value;

        if (currentPassword !== thisUser.password && currentPassword.length !== 0) {
            window.alert("Your password wasn't correct!");
        } else if (password !== confirmPassword) {
            window.alert("Password and confirm password didn't match!");
        }
        else if (password.length !== 0) {

            const newPassword: Login = {
                email: currentUser.email,
                password: password,
                confirmPassword: confirmPassword
            }

            editUser(newPassword);
        }

        updateProfile(editedProfile);
        dispatch({type: "UPDATE_PROFILE", payload:editedProfile});
        rootNavigate("/profile");
    }

    return (
        <div className="min-h-[calc(100vh-65px)] w-screen bg-darkBackground text-gray-600">
            <form onSubmit={handleSubmit} className="w-fit mx-auto p-10">

                <div className="flex-col flex gap-y-3 w-[420px]">
                    <label>
                        <p className="mb-1 font-semibold">Username</p> <input id="username" name="username" className="rounded-md px-2 py-1 bg-lightBackground w-[420px]" defaultValue={currentUser.username} placeholder="Username " />
                    </label>
                    <div className="flex gap-x-[20px]">
                        <label>
                            <p className="mb-1 font-semibold">First name</p> <input id="firstname" name="firstname" className="rounded-md px-2 py-1 bg-lightBackground w-[200px]" defaultValue={currentUser.firstname} placeholder="First name" />
                        </label>
                        <label>
                            <p className="mb-1 font-semibold">Last name</p> <input id="lastname" name="lastname" className="rounded-md px-2 py-1 bg-lightBackground w-[200px]" defaultValue={currentUser.lastname} placeholder="Last name" />
                        </label>
                    </div>
                    <label>
                        <p className="mb-1 font-semibold">Age</p> <input id="age" name="age" type="number" className="rounded-md px-2 py-1 bg-lightBackground w-[420px]" defaultValue={currentUser.age} placeholder="Age" />
                    </label>
                    <label>
                        <p className="mb-1 font-semibold">Discord Nick</p>
                        <input id="discord" name="discord" className="rounded-md px-2 py-1 bg-lightBackground w-[420px]" defaultValue={currentUser.discord} placeholder="Discord nick" />
                    </label>

                    {/*<label>
                    Avatar: 
                </label>*/}
                    <button className="uppercase text-sm font-semibold rounded-full ml-auto bg-primary w-36 px-2 py-2.5 mb-5 mt-3" type="submit">Update Profile</button>
                </div>

                <hr className="w-full border-gray-600 w-full ml-auto"></hr>

                <div className="flex-col flex gap-y-3 mt-5 w-[420px]">
                    <label>
                        <p className="mb-1 font-semibold">Current Password</p> <input type="password" id="currentPassword" name="currentPassword" className="rounded-md px-2 py-1 bg-lightBackground w-[420px]" placeholder="Current password" />
                    </label>
                    <label>
                        <p className="mb-1 mt-5 font-semibold">New Password</p> <input type="password" id="password" name="password" className="rounded-md px-2 py-1 bg-lightBackground w-[420px]" placeholder="New password" />
                    </label>
                    <label>
                        <p className="mb-1 font-semibold">Confirm New Password</p> <input type="password" id="confirm_password" name="confirm_password" className="rounded-md px-2 py-1 bg-lightBackground w-[420px]" placeholder="Confirm password" />
                    </label>

                    <button onClick={togglePasswordEdit} className="uppercase text-sm font-semibold rounded-full ml-auto bg-primary w-36 px-2 py-2.5 mt-3 mb-5">Set Password</button>
                </div>

                <hr className="w-full border-gray-600 w-full ml-auto"></hr>

                <div className="flex justify-right">
                    <button onClick={removeProfile} className="uppercase text-sm font-semibold rounded-full ml-auto w-36 bg-red-500 w-1/2 py-2.5 mt-5">Delete Profile</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfileForm;