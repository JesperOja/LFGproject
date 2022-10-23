import axios from "axios";
import { Post } from "../types";

//const baseUrl = "https://immense-cove-02108.herokuapp.com/api/Post";
const baseUrl = "http://localhost:3001/api/post";

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


export const deletePost = async (id: number) => {
    try{
        const {data: data} = await axios.delete<string>(`${baseUrl}/${id}`);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const editPost = async (post: Post) => {
    try{
        const {data: data} = await axios.put<string>(baseUrl, post);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const likePost = async (id: number) => {
    try{
        const {data: data} = await axios.post<Post>(`${baseUrl}/${id}/like`);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}

export const dislikePost = async (id: number) => {
    try{
        const {data: data} = await axios.post<Post>(`${baseUrl}/${id}/dislike`);
        return data;
    }catch (e: unknown) {
        let errorMessage = 'Something went wrong.'
        if (axios.isAxiosError(e) && e.response) {
            errorMessage += ' Error: ' + e.response.data;
        }
        console.error(errorMessage);

    }
}