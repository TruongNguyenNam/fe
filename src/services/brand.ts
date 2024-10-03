import axios, { AxiosInstance } from 'axios';

const API_URL = "http://localhost:8080/api/v1/admin/brand";

export interface BrandResponse {
    id: number;
    name: string;
    description: string;
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

export const getAllBrands = async (): Promise<BrandResponse[]> => {
    try {
        const response = await axiosInstance.get<BrandResponse[]>('');
        return response.data;
    } catch (error) {
        console.error("Get all brands error: ", error);
        throw error;
    }
};
