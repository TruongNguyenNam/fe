import { useEffect, useState } from 'react';
import { getOrderHistory, OrderHistoryResponse } from '../services/orderHistory'; // Importing missing dependencies

const useOrderHistory = (userId: number) => {
    const [orderHistory, setOrderHistory] = useState<OrderHistoryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                setLoading(true);
                const history = await getOrderHistory(userId);
                setOrderHistory(history);
            } catch (err) {
                setError("Failed to fetch order history");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [userId]);

    return { orderHistory, loading, error };
};

export default useOrderHistory;
