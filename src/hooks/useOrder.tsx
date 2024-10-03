import { useState } from 'react';
import { OrderRequest, OrderResponse, placeOrder } from '../services/order';

const useOrder = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null);

    const submitOrder = async (userId: number, orderRequest: OrderRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await placeOrder(userId, orderRequest);
            setOrderResponse(response);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.');
            }
            console.error('Order submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        orderResponse,
        submitOrder
    };
};

export default useOrder;
