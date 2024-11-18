"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchEntities, fetchEntitiesWithPagination } from "../utils/apiHelper";

type EntityResult = {
    name: string;
    url: string;
    type: string;
};

type StarWarsContextType = {
    query: string;
    setQuery: (query: string) => void;
    results: EntityResult[];
    loading: boolean;
    error: string | null;
    nextPage: string | null;
    searchEntities: () => void;
    loadMoreResults: () => void;
    clearSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
    favorites: EntityResult[];
    toggleFavorite: (entity: EntityResult) => void;
};

const StarWarsContext = createContext<StarWarsContextType | undefined>(undefined);

export const StarWarsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<EntityResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<EntityResult[]>([]);

    // Load favorites from localStorage
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const searchEntities = async () => {
        setLoading(true);
        setResults([]);
        setError(null);

        try {
            const people = await fetchEntities("people", query);
            const planets = await fetchEntities("planets", query);
            const starships = await fetchEntities("starships", query);

            setResults([
                ...people.results.map((item: any) => ({ ...item, type: "people" })),
                ...planets.results.map((item: any) => ({ ...item, type: "planets" })),
                ...starships.results.map((item: any) => ({ ...item, type: "starships" })),
            ]);
            setNextPage(people.next || planets.next || starships.next);
        } catch (err: any) {
            setError("Failed to fetch data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const loadMoreResults = async () => {
        if (!nextPage || loading) return;

        setLoading(true);
        try {
            const data = await fetchEntitiesWithPagination(nextPage);
            setResults((prevResults) => [
                ...prevResults,
                ...data.results.map((item: any) => ({ ...item, type: "people" })),
            ]);
            setNextPage(data.next);
        } catch (err: any) {
            setError("Failed to load more results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = (entity: EntityResult) => {
        setFavorites((prevFavorites) => {
            const isFavorited = prevFavorites.some((fav) => fav.url === entity.url);
            if (isFavorited) {
                return prevFavorites.filter((fav) => fav.url !== entity.url);
            } else {
                return [...prevFavorites, entity];
            }
        });
    };
    const clearSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setQuery(""); 
        setResults([]); 
        setError(null); 
        setNextPage(null)
    };
    return (
        <StarWarsContext.Provider
            value={{
                query,
                setQuery,
                results,
                loading,
                error,
                nextPage,
                searchEntities,
                loadMoreResults,
                favorites,
                toggleFavorite,
                clearSearch
            }}
        >
            {children}
        </StarWarsContext.Provider>
    );
};

export const useStarWarsContext = () => {
    const context = useContext(StarWarsContext);
    if (!context) {
        throw new Error("useStarWarsContext must be used within a StarWarsProvider");
    }
    return context;
};