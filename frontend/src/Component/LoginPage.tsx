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
                <FormRender isLogin={registerForm} showRegister={showRegister} />
                <button id='registerButton' onClick={() => showRegisterForm()} > <ButtonText isLogin={registerForm} /> </button>
            </div>
        </div>
    )
}

type MainProps = {
    isLogin: boolean;
    showRegister: React.Dispatch<React.SetStateAction<boolean>>;
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

