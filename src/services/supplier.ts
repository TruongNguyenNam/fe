import axios, { AxiosInstance } from 'axios';

const API_URL = "http://localhost:8080/api/v1/admin/supplier";

export interface SupplierResponse {
    id: number;
    name: string;
    contactInfo: string;
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

export const getAllSuppliers = async (): Promise<SupplierResponse[]> => {
    try {
        const response = await axiosInstance.get<SupplierResponse[]>('');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.error("Get all suppliers error: Resource not found");
            return []; // Return an empty array if the resource is not found
        }
        console.error("Get all suppliers error: ", error);
        throw error;
    }
};
