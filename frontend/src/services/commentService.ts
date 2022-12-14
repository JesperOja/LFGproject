import axios from "axios";
import { Comment } from "../types";

//const baseUrl = "http://localhost:3001/api/comment";
const baseUrl = "https://lfg.fly.dev/api/comment";

export const getComments = async () => {
    try {
		const { data: comments } = await axios.get<Comment[]>(baseUrl);
		return comments;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
};

export const addComment = async (comment: Comment) => {
    try {
		const { data: comments } = await axios.post<Comment>(baseUrl, comment);
		return comments;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
};

export const deleteComment = async (id: number) => {
	try {
		await axios.delete(`${baseUrl}/${id}`)
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
};

export const editComment = async (comment: Comment) => {
	try {
		const { data: data } = await axios.put<Comment>(baseUrl, comment)
		return data;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
}