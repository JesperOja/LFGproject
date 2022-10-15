import React from "react";
import { useStateValue } from "../state/state";
import { SignIn } from '../services/loginService';
import { rootNavigate } from "./CustomRouter";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const Login: React.FC = () => {
    const [, dispatch] = useStateValue();

    const handleLogin = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;

        SignIn({ email: email, password: password }).then(mess => {
                dispatch({ type: "LOGIN", payload: email });
                dispatch({ type: "ADD_LOGIN", payload: { email: email, password: password } });
                rootNavigate("/");
        });

        e.currentTarget.elements.password.value = '';
        e.currentTarget.elements.email.value = '';
    }

    return (
        <div>
            
            <div >

                <div >
                    LOGIN
                </div>

                {/* Login form */}
                <form id='login' onSubmit={handleLogin} >
                    <label >
                        E-mail
                        <input name='email' id='email'
                            placeholder='Email'
                            type='name'
                            />
                    </label>

                    <label >
                        Password
                        <input name='password' id='password'
                            type='password'
                            placeholder='Password'
                            />
                    </label>

                    <button type='submit'>
                        Login
                    </button>

                    <hr className='border-gray-300'></hr>
                </form>
                {/* /Login form */}

            </div>
        </div>
    );
};

export default Login;