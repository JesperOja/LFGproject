import axios from "axios";
import { ProfileModel } from "../types";

const baseUrl = "https://immense-cove-02108.herokuapp.com/api/Profiles";

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