import axios from "axios";
import { Post } from "../types";

const baseUrl = "https://immense-cove-02108.herokuapp.com/api/Post";

export const getPosts = async () => {
    try{
        const {data: data} = await axios.get<Post[]>(baseUrl);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const addPost = async (post: Post) => {
    try{
        const {data: data} = await axios.post<Post>(baseUrl, post);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}