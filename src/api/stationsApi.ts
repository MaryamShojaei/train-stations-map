import type { Station } from "../types/Station";

const STATIONS_URL =
  "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/fc7dc242f41393845d90edaa99e32e28f1ddfe24/train-stations.json";
export async function fetchStations(): Promise<Station[]> {
  const response = await fetch(STATIONS_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch stations");
  }

  const data = (await response.json()) as Station[];

  return data;
}
