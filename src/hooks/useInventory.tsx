import { useState, useEffect } from 'react';
import { getAllInventories, InventoryResponse } from '../services/inventory';

const useInventory = () => {
    const [inventories, setInventories] = useState<InventoryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const fetchedInventories = await getAllInventories();
                setInventories(fetchedInventories);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch inventories');
                setLoading(false);
            }
        };

        fetchInventories();
    }, []);

    return { inventories, loading, error };
};

export default useInventory;
