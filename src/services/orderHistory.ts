import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/admin/orderHistory";

export interface OrderHistoryResponse {
    orderId: number;
    orderDate: Date;
    totalAmount: number;
    status: string;
    shippingMethod: string;
    trackingNumber: string;
    shippingStatus: string;
}

export const getOrderHistory = async (userId: number): Promise<OrderHistoryResponse[]> => {
    try {
        const token = localStorage.getItem('authToken'); // Get the authentication token directly from localStorage
        const response = await axios.get<OrderHistoryResponse[]>(`${API_URL}/history`, {
            params: { userId },
            headers: {
                'Authorization': `Bearer ${token}` // Set the authorization header
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching order history: ", error);
        throw error;
    }
};
