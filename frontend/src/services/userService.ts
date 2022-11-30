import axios from "axios";
import { Login } from "../types";

//const baseUrl = "https://immense-cove-02108.herokuapp.com/api/User";
const baseUrl = "http://localhost:3001/api/user";

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

export const editUser = async (user: Login) => {
    try {
        const { data: data } = await axios.put<Login>(`${baseUrl}/${user.email}`, user);
        return data;
    } catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const deleteUser = async (email: string) => {
    try {
        await axios.delete(`${baseUrl}/${email}`);
    } catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}