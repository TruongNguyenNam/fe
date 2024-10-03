import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = "http://localhost:8080/api/v1/admin/order";

export interface OrderDetailRequest {
    productId: number;
    quantity: number;
}

export interface OrderRequest {
    shippingAddress: string;
    paymentMethod: string;
    orderDetails: OrderDetailRequest[];
    promotionCode?: string;
}

export interface OrderDetailResponse {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    total: number;
}

export interface OrderResponse {
    id: number;
    userId: number;
    orderDate: string;
    status: string;
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
    orderDetails: OrderDetailResponse[];
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

export const placeOrder = async (userId: number, orderRequest: OrderRequest): Promise<OrderResponse> => {
    try {
        console.log(`Sending POST request to ${API_URL}/${userId}`);
        console.log('Order request:', JSON.stringify(orderRequest, null, 2));
        const response = await axiosInstance.post<OrderResponse>(`/${userId}`, orderRequest);
        console.log('Order placed successfully:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error("Place order error: ", {
                message: axiosError.message,
                response: axiosError.response?.data,
                status: axiosError.response?.status,
                headers: axiosError.response?.headers
            });
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};