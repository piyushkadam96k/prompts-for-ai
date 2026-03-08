import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'prompt-favorites';

function loadFavorites() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveFavorites(favs) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    } catch {
        // storage full or unavailable
    }
}

/**
 * Hook to manage favorite prompts stored in localStorage.
 * Each favorite is stored as a small object: { company, name, tool }
 * to keep localStorage lean (no full prompt content).
 */
export function useFavorites() {
    const [favorites, setFavorites] = useState(loadFavorites);

    useEffect(() => {
        saveFavorites(favorites);
    }, [favorites]);

    const isFavorite = useCallback(
        (prompt) =>
            favorites.some(
                (f) => f.company === prompt.company && f.name === prompt.name
            ),
        [favorites]
    );

    const toggleFavorite = useCallback((prompt) => {
        setFavorites((prev) => {
            const exists = prev.some(
                (f) => f.company === prompt.company && f.name === prompt.name
            );
            if (exists) {
                return prev.filter(
                    (f) => !(f.company === prompt.company && f.name === prompt.name)
                );
            }
            return [
                ...prev,
                { company: prompt.company, name: prompt.name, tool: prompt.tool },
            ];
        });
    }, []);

    const clearFavorites = useCallback(() => {
        setFavorites([]);
    }, []);

    return { favorites, isFavorite, toggleFavorite, clearFavorites };
}
