import { useState, useEffect } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const cityCoords: Record<string, { lat: number, lon: number }> = {
    guayaquil: { lat: -2.1962, lon: -79.8862 },
    quito: { lat: -0.2298, lon: -78.525 },
    manta: { lat: -0.9494, lon: -80.7314 },
    cuenca: { lat: -2.9005, lon: -79.0045 }
};

function DataFetcher(city: string): DataFetcherOutput {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!cityCoords[city]) {
            setError("Ciudad no válida");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);

        const { lat, lon } = cityCoords[city];
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error en la petición: ${response.status}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);
            } catch (err: any) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]);

    return { data, loading, error };
}

export default DataFetcher;