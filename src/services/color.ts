import axios, { AxiosInstance } from 'axios';

const API_URL = "http://localhost:8080/api/v1/admin/color";

export interface ColorResponse {
    id: number;
    name: string;
    // Add other properties as needed
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getAllColors = async (): Promise<ColorResponse[]> => {
    try {
        const response = await axiosInstance.get<ColorResponse[]>('');
        return response.data;
    } catch (error) {
        console.error("Get all colors error: ", error);
        throw error;
    }
};
