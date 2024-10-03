import { useState, useEffect } from 'react';
import { getAllSuppliers, SupplierResponse } from '../services/supplier';

const useSupplier = () => {
    const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const fetchedSuppliers = await getAllSuppliers();
                setSuppliers(fetchedSuppliers);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch suppliers');
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    return { suppliers, loading, error };
};

export default useSupplier;
