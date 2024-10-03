import { useState, useEffect } from 'react';
import { getAllTags, TagResponse } from '../services/tag';

const useTag = () => {
    const [tags, setTags] = useState<TagResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const fetchedTags = await getAllTags();
                setTags(fetchedTags);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch tags');
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    return { tags, loading, error };
};

export default useTag;
