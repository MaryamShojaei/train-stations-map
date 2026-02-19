import { useEffect, useState } from "react";
import { fetchStations } from "../api/stationsApi";
import type { Station } from "../types/Station";

interface UseStationsResult {
  stations: Station[];
  loading: boolean;
  error: string | null;
}

export function useStations(): UseStationsResult {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStations();
        if (active) setStations(data);
      } catch (err: any) {
        if (active) setError(err.message ?? "Unknown error");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  return { stations, loading, error };
}
