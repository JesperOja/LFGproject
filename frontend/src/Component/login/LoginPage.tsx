import React from "react";
import Login from './Login'
import Register from './Register';

export default function LoginPage() {
    const [registerForm, showRegister] = React.useState<boolean>(true);

    const showRegisterForm = () => {
        showRegister(!registerForm);
    }

    return (
        <div >
            
            <div >
                <FormRender isLogin={registerForm} showRegister={showRegisterForm} />
                <button id='registerButton' onClick={() => showRegisterForm()} className='py-3 px-6 mt-6 w-fit text-center mx-auto block uppercase font-semibold subpixel-antialiased font-sm text-gray-500 hover:text-gray-900' > <ButtonText isLogin={registerForm}  /> </button>
            </div>
        </div>
    )
}

type MainProps = {
    isLogin: boolean;
    showRegister: () => void;
}

class FormRender extends React.Component<MainProps> {
    
    render() {
        let formToRender;
        if (this.props.isLogin) {
            formToRender = <Login />
        } else {
            formToRender = <Register closeRegister={this.props.showRegister} />
        }

        return (
            <>
                {formToRender}
            </>
        );
    }

}

type ButtonProps = {
    isLogin: boolean;
}

class ButtonText extends React.Component<ButtonProps> {

    render() {
        if (this.props.isLogin) {
            return <> Register here </>
        } else {
            return <> Login here </>
        }
    }
}

