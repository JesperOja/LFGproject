import React from "react";
import { useStateValue } from "../../state/state";
import { SignUp } from '../../services/loginService';
import { addProfile } from '../../services/profileService';
import { ProfileModel } from "../../types";

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
    
    const handleRegister = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();
        const date = new Date();
        const today = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();

        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;
        const username = e.currentTarget.elements.username.value;
        const firstname = e.currentTarget.elements.firstname.value;
        const lastname = e.currentTarget.elements.lastname.value;
        const age = Number(e.currentTarget.elements.age.value);
        const discord = e.currentTarget.elements.discord.value;
        const confirm = e.currentTarget.elements.confirm_password.value;

        const newProfile: ProfileModel = {
            email: email,
            username: username,
            firstname: firstname,
            lastname: lastname,
            age: age,
            avatar: "avatar",
            discord: discord,
            joiningDate: today
        };

        addProfile(newProfile);

        dispatch({
            type: "ADD_PROFILE", payload: newProfile
        });

        SignUp({ email: email, password: password, confirmPassword: confirm });

        dispatch({ type: "ADD_LOGIN", payload: { email: email, password: password } })
        closeRegister();
    }

    return (
        <div className='h-[870px] w-3/5 mx-auto'>
        <div className='font-semibold subpixel-antialiased'>
            REGISTER
        </div>

        <form id='register' onSubmit={handleRegister} className='h-full flex flex-col relative pt-2 pb-8'>
            <div className='flex flex-col'>
                <label className='mt-4'>
                    Email:
                    <input name='email'
                        id="email"
                        type="email"
                        placeholder="Write your email"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                </label>
                <label className='mt-4'>
                    Password:
                    <input name='password'
                        id="password"
                        type="password"
                        placeholder="Password"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1'
                    />
                </label>

                <label className='mt-4'>
                    Confirm password:
                    <input name='confirm_password'
                        id="confim_password"
                        type="password"
                        placeholder="Confirm Password"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                </label>

                <label className='mt-4'>
                    Username:
                    <input
                        name='username'
                        id='username'
                        placeholder="Username"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                </label>
            </div>
            <fieldset className='ring-2 ring-gray-300 ring-inset px-4 pb-4 mt-4 -mx-4 rounded-md flex flex-col'>
                <legend className='bg-white'>Optional</legend>

                <div className='flex justify-between mt-3'>
                    <label className='w-[49%]'>
                        First name:
                        <input
                            name="firstname"
                            id="firstname"
                            placeholder="First name (optional)"
                            className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                    </label>

                    <label className='w-[49%]'>
                        Last name:
                        <input
                            name="lastname"
                            id="lastname"
                            placeholder="Last name (optional)"
                            className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                    </label>
                </div>

                <label className='mt-4'>
                    Age:
                    <input
                        name="age"
                        id="age"
                        type="number"
                        placeholder="Your age (optional)"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1'
                    />
                </label>

                <label className='mt-4'>
                    Discord nick:
                    <input
                        name="discord"
                        id="discord"
                        placeholder="Discord nick (optional)"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                </label>
            </fieldset>

            <button className='rounded-full bg-primary py-2 text-white w-full uppercase font-semibold subpixel-antialiased font-sm mt-8 mb-8' type='submit'>
                Register
            </button>

            <div className='text-sm absolute bottom-0 w-full'>
                <p className='p-1.5 bg-white border-solid border border-gray-300 w-fit rounded-full mx-auto'>
                    OR
                </p>
            </div>

            <hr className='border-gray-300'></hr>
        </form>
    </div>
    );
}

export default Register;