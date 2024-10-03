import { useState, useEffect } from 'react';
import { getAllSizes, SizeResponse } from '../services/size';

const useSize = () => {
    const [sizes, setSizes] = useState<SizeResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const fetchedSizes = await getAllSizes();
                setSizes(fetchedSizes);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching sizes:", err);
                setError('Failed to fetch sizes');
                setLoading(false);
            }
        };

        fetchSizes();
    }, []);

    return { sizes, loading, error };
};

export default useSize;
