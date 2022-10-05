import axios from "axios";
import { Login } from "../types";

const baseUrl = "https://immense-cove-02108.herokuapp.com/api/User";

export const getUsers = async () => {
    try {

        const { data: data } = await axios.get<Login[]>(baseUrl);
        
        return data;
    } catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}