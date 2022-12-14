import React from "react";
import { useStateValue } from "../../state/state";
import { SignIn } from '../../services/loginService';
import { rootNavigate } from "../router/CustomRouter";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const Login: React.FC = () => {
    const [{login}, dispatch] = useStateValue();

    const handleLogin = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;

        const logginAttempt = Object.values(login).find(log => log.password === password && log.email === email)
        if(logginAttempt){
            SignIn({ email: email, password: password }).then(mess => {
                dispatch({ type: "LOGIN", payload: email });
                dispatch({ type: "ADD_LOGIN", payload: { email: email, password: password } });
                rootNavigate("/");
        });
        }else{
            window.alert("Email or password incorrect")
        }
        

        e.currentTarget.elements.password.value = '';
        e.currentTarget.elements.email.value = '';
    }

    return (
        <div className='h-[300px] w-3/5 m-auto'>

                <div className='font-semibold subpixel-antialiased'>
                    LOGIN
                </div>

                {/* Login form */}
                <form id='login' onSubmit={handleLogin} className='h-full flex flex-col relative pt-2 pb-8'>
                    <label className='mt-4'>
                        E-mail
                        <input name='email' id='email'
                            placeholder='Email'
                            type='name'
                            className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                    </label>

                    <label className='mt-4'>
                        Password
                        <input name='password' id='password'
                            type='password'
                            placeholder='Password'
                            className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                    </label>

                    <button className='rounded-full bg-primary py-2 text-white w-full uppercase font-semibold subpixel-antialiased font-sm mt-6 mb-9 hover:drop-shadow-xl' type='submit'>
                        Login
                    </button>

                    <div className='text-sm absolute bottom-0 w-full'>
                        <p className='p-1.5 bg-white border-solid border border-gray-300 w-fit rounded-full mx-auto'>
                            OR
                        </p>
                    </div>

                    <hr className='border-gray-300'></hr>
                </form>
                {/* /Login form */}

            </div>
    );
};

export default Login;