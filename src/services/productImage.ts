import axios, { AxiosInstance } from 'axios';

const API_URL = "http://localhost:8080/api/v1/admin/ProductImage";

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

export interface ProductImageResponse {
    id: number;
    imageUrl: string;
    productId: number;
}

export const uploadProductImages = async (images: File[]): Promise<number[]> => {
    try {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image);
        });

        const response = await axiosInstance.post<number[]>('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Upload images error: ", error);
        throw error;
    }
};

export const getProductImageById = async (id: number): Promise<ProductImageResponse> => {
    try {
        const response = await axiosInstance.get<ProductImageResponse>(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get product image error: ", error);
        throw error;
    }
};
