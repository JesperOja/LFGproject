import axios from "axios";
import { Login } from "../types";

const Url = "http://localhost:3001/api/user";



export const SignIn = async (login: Login) => {
    
    try{
        const{data: message} = await axios.post<Login>(`${Url}/Login`, login)
        console.log(message);
        
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}

export const SignUp = async (signup: Login) => {
    try{
        const{data: message} = await axios.post<Login>(`${Url}/SignUp`, signup)
        console.log(message);
        
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}
