import { useState, useEffect } from 'react';
import { BrandResponse, getAllBrands } from '../services/brand';

const useBrand = () => {
    const [brands, setBrands] = useState<BrandResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await getAllBrands();
                setBrands(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching brands:", error);
                setError('Failed to fetch brands');
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    return { brands, loading, error };
};

export default useBrand;
