const entityCache: Record<string, any> = {};
const detailsCache: Record<string, any> = {};


export const fetchEntityDetails = async (entityType: string, id: string) => {
    const cacheKey = `${entityType}-${id}`;
    if (detailsCache[cacheKey]) {
        console.log('Serving from cache:', cacheKey);
        return detailsCache[cacheKey];
    }

    const url = `https://swapi.dev/api/${entityType}/${id}/`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch details');
    }

    const data = await response.json();
    detailsCache[cacheKey] = data; // Store in cache
    return data;
};

export const fetchEntities = async (entityType: string, query: string) => {
    const cacheKey = `${entityType}-${query}`;
    if (entityCache[cacheKey]) {
        console.log('Serving from cache:', cacheKey);
        return entityCache[cacheKey];
    }

    const url = `https://swapi.dev/api/${entityType}/?search=${query}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    entityCache[cacheKey] = data; // Store in cache
    return data;
};

export const fetchEntitiesWithPagination = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return response.json();
};

