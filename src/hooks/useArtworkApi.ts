import { useState } from 'react';

import { ImageType } from '../types';

const fields = [
    'id',
    '_score',
    'image_id',
    'title',
    'artist_display'
]

export interface ArtworkApiHookReturnProps {
    artwork: ImageType[];
    error: string | null;
    isLoading: boolean;
    searchArtwork: (search: string) => Promise<void>;
}

export const useArtworkApi = (): ArtworkApiHookReturnProps => {
    const [artwork, setArtwork] = useState<ImageType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchArtwork = async (search: string = '') => {
        setIsLoading(true);

        const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=${fields.join(',')}`);
        const data = await response.json();

        if (response.status === 200) {
            setArtwork(data.data);
        } else {
            setError(`${data.error} ${data.detail}`);
        }

        setIsLoading(false);
    };

    return {
        artwork,
        error,
        isLoading,
        searchArtwork
    };
}
