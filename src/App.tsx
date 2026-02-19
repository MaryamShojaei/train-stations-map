import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { CityFilter } from "./components/CityFilter";
import { StationsList } from "./components/StationsList";
import { StationsMap } from "./components/StationsMap";
import { useStations } from "./hooks/useStations";
import type { Station } from "./types/Station";

function App() {
  const { stations, loading, error } = useStations();
  const [cityFilter, setCityFilter] = useState("");
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const filteredStations = useMemo(() => {
    if (!cityFilter.trim()) return stations;

    const filterLower = cityFilter.toLowerCase();
    return stations.filter((station) =>
      station.city.toLowerCase().includes(filterLower),
    );
  }, [stations, cityFilter]);

  // ⬇️ این بخش تازه است
  useEffect(() => {
    if (filteredStations.length > 0) {
      // وقتی فیلتر عوض شد، اولین ایستگاه همان شهر را انتخاب کن
      setSelectedStation(filteredStations[0]);
    } else {
      // اگر چیزی پیدا نشد، انتخاب را خالی کن
      setSelectedStation(null);
    }
  }, [filteredStations]);
  // ⬆️ تا اینجا

  const handleSelectStation = (station: Station) => {
    setSelectedStation(station);
  };

  return (
    <div className="app-root">
      <h1 className="app-title">Train Stations in Germany</h1>

      {loading && <div>Loading stations...</div>}

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          Failed to load stations: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="app-filter">
            <CityFilter value={cityFilter} onChange={setCityFilter} />
          </div>

          <div className="app-layout">
            <div className="app-map-wrapper">
              <StationsMap
                stations={filteredStations}
                selectedStation={selectedStation}
                onSelect={handleSelectStation}
              />
            </div>

            <StationsList
              stations={filteredStations}
              selectedStationId={selectedStation?.id ?? null}
              onSelect={handleSelectStation}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
