import axios from "axios";
import { ProfileModel } from "../types";

const baseUrl = "https://lfg.fly.dev/api/profile";
//const baseUrl = "http://localhost:3001/api/profile";

export const addProfile = async (profile: ProfileModel) => {
    try{
        const {data: data} = await axios.post<ProfileModel>(baseUrl, profile);
        
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}

export const getProfiles = async () => {
    try{
        const {data: data} = await axios.get<ProfileModel[]>(baseUrl);
        
        return data;
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}


export const updateProfile = async (profile: ProfileModel) => {
    try{
        const {data: data} = await axios.put<ProfileModel>(`${baseUrl}/${profile.id}`, profile);
        
        return data;
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
    }
}

export const deleteProfile = async (id:number) => {
    try{
        await axios.delete(`${baseUrl}/${id}`);
    }catch(e: unknown){
        let errorMessage = 'Something went wrong.'
		if (axios.isAxiosError(e) && e.response) {
			errorMessage += ' Error: ' + e.response.data;
		}
		console.error(errorMessage);
        
    }
}