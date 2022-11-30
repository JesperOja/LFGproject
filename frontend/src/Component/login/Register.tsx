import React from "react";
import { useStateValue } from "../../state/state";
import { SignUp } from '../../services/loginService';
import { addProfile } from '../../services/profileService';
import { ProfileModel } from "../../types";
//import { rootNavigate } from "../router/CustomRouter";

interface Props {
    closeRegister: () => void;
}

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    username: HTMLInputElement;
    firstname: HTMLInputElement;
    lastname: HTMLInputElement;
    age: HTMLInputElement;
    discord: HTMLInputElement;
    confirm_password: HTMLInputElement;
    avatar: HTMLInputElement
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const Register: React.FC<Props> = ({ closeRegister }) => {
    const [, dispatch] = useStateValue();
    const [myAvatar, setAvatar] = React.useState<File>()

    const handleCancel = () => {
        closeRegister();
    }
    const handleRegister = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();
        const date = new Date();
        const today = date.getFullYear() +"."+ (date.getMonth()+1) +"."+ date.getDate();
        
        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;
        const username = e.currentTarget.elements.username.value;
        const firstname = e.currentTarget.elements.firstname.value;
        const lastname = e.currentTarget.elements.lastname.value;
        const age = Number(e.currentTarget.elements.age.value);
        const discord = e.currentTarget.elements.discord.value;
        const confirm = e.currentTarget.elements.confirm_password.value;
        //const avatar = new File(e.currentTarget.elements.avatar.value);
        if(myAvatar){
            const avatar = myAvatar;
            console.log(avatar.name);
        }
        
        const newProfile: ProfileModel = {
            email: email, 
            username: username, 
            firstname:firstname,
            lastname: lastname, 
            age: age,
            avatar:"avatar", 
            discord: discord,
            joiningDate: today
        };

        addProfile(newProfile);

        dispatch({
            type: "ADD_PROFILE", payload: newProfile
        });

        SignUp({ email: email, password: password, confirmPassword: confirm});

        dispatch({ type: "ADD_LOGIN", payload: { email: email, password: password } })
        closeRegister();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        
        const fileList: FileList = e.target.files as FileList;
        console.log(fileList[0]);
        setAvatar(fileList[0]);
    }

    return (
        <><h1>Register info</h1>
            <form onSubmit={handleRegister}>
                <div>Email: </div><input name='email'
                    id="email"
                    type="email"
                    placeholder="Write your email"
                /><br />
                <div>Password:</div> <input name='password'
                    id="password"
                    type="password"
                    placeholder="Password"
                /><br />
                <div>Confirm password:</div> <input name='confirm_password'
                    id="confim_password"
                    type="password"
                    placeholder="Confirm Password"
                /><br />
                <div>Username:</div> <input name='username' id='username'
                    placeholder="Username" /> <br />

                <div>First name:</div> <input name="firstname"
                    id="firstname" placeholder="First name (optional)" /><br />

                <div>Last name:</div> <input name="lastname"
                    id="lastname" placeholder="Last name (optional)" /> <br />

                <div>Age:</div> <input name="age" id="age" type="number"
                    placeholder="Your age (optional)" /> <br />

                <div>Discord nick:</div> <input name="discord" id="discord"
                    placeholder="Discord nick (optional)" /> <br />

<div>Avatar: <input type="file" accept="image/*" multiple={false} id="avatar" name="avatar" onChange={handleChange } />
        </div>
                <button type='submit'>Register</button><br />
                


            </form>
            <button onClick={handleCancel}>Cancel</button>
        </>
    );
}

export default Register;