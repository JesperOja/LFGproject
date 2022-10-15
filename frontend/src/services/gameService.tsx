import axios from "axios";
import { json } from "react-router-dom";
import { Game } from "../types"

//const baseUrl = "https://immense-cove-02108.herokuapp.com/api/Game";
const baseUrl = "http://localhost:3001/api/game";

export const getAll = async () => {
	try {
		const { data: games } = await axios.get<Game[]>(baseUrl);
		JSON.stringify(games);
		return games
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}

}

export const addGame = async (game: Game) => {
	try {
		await axios.post<Game>(baseUrl, game)
		return game;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
}


export const editGame = async (game: Game) => {
	try {
		const { data: data } = await axios.put<Game>(baseUrl, game)
		return data;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
}

export const deleteGame = async (id: number) => {
	try {
		const { data: data } = await axios.delete<string>(`${baseUrl}/${id}`)
		return data;
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
}