import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = "http://localhost:8080/api/v1/admin/inventory";

export interface InventoryResponse {
    id: number;
    productId: number;
    productName: string;
    stock: number;
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

export const getAllInventories = async (): Promise<InventoryResponse[]> => {
    try {
        const response = await axiosInstance.get<InventoryResponse[]>('');
        return response.data;
    } catch (error) {
        console.error("Get all inventories error: ", error);
        throw error;
    }
};
