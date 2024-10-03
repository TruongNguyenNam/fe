import axios, { AxiosInstance } from 'axios';

const API_URL = "http://localhost:8080/api/v1/admin/cart";

export interface CartRequest {
    quantity: number;
    productId: number;
    userId: number;
}

export interface CartResponse {
    id: number;
    quantity: number;
    productId: number;
    productName: string;
    productPrice: number;
    userId: number;
    totalPrice: number;
    createdDate: string;
    lastModifiedDate: string;
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

export const addToCart = async (request: CartRequest): Promise<CartResponse> => {
    try {
        const response = await axiosInstance.post<CartResponse>('/add', request);
        return response.data;
    } catch (error) {
        console.error("Add to cart error: ", error);
        throw error;
    }
};

export const viewCart = async (userId: number): Promise<CartResponse[]> => {
    try {
        const response = await axiosInstance.get<CartResponse[]>(`/${userId}`);
        return response.data;
    } catch (error) {
        console.error("View cart error: ", error);
        throw error;
    }
};

export const updateCartQuantity = async (cartId: number, newQuantity: number): Promise<CartResponse> => {
    try {
        const response = await axiosInstance.put<CartResponse>(`/update/${cartId}`, null, {
            params: { newQuantity }
        });
        return response.data;
    } catch (error) {
        console.error("Update cart quantity error: ", error);
        throw error;
    }
};

export const removeFromCart = async (cartId: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/remove/${cartId}`);
    } catch (error) {
        console.error("Remove from cart error: ", error);
        throw error;
    }
};
