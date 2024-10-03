import axios, { AxiosInstance } from 'axios';

const API_URL = "http://localhost:8080/api/v1/admin/tag";

export interface TagResponse {
    id: number;
    name: string;
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

export const getAllTags = async (): Promise<TagResponse[]> => {
    try {
        const response = await axiosInstance.get<TagResponse[]>('');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.error("Get all tags error: Resource not found");
            return []; // Return an empty array if the resource is not found
        }
        console.error("Get all tags error: ", error);
        throw error;
    }
};
