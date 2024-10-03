import { useState, useEffect } from 'react';
import { ColorResponse, getAllColors } from '../services/color';

const useColor = () => {
    const [colors, setColors] = useState<ColorResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const data = await getAllColors();
                setColors(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching colors:", error);
                setError('Failed to fetch colors');
                setLoading(false);
            }
        };

        fetchColors();
    }, []);

    return { colors, loading, error };
};

export default useColor;
