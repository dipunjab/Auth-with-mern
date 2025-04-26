import axios from "axios";
import {create} from "zustand";


const auth_url = "http://localhost:5000/api/auth"

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async(email, password, name) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${auth_url}/signup`, {email, password, name});
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
        } catch (error) {
            set({error: error.response.data.message || "Error Signing Up", isLoading: false}); 
            throw error;
        }
    }
}))