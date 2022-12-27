import axios from "axios";
import { Game } from "../types"

const baseUrl = "https://lfg.fly.dev/api/game";
//const baseUrl = "http://localhost:3001/api/game";

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
		const { data: data } = await axios.put<Game>(`${baseUrl}/${game.id}`, game)
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
		await axios.delete(`${baseUrl}/${id}`)
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(error) && error.response) {
			errorMessage += ' Error: ' + error.response.data;
		}
		console.error(errorMessage);
	}
}