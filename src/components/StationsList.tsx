import React from "react";
import type { Station } from "../types/Station";

interface StationsListProps {
  stations: Station[];
  selectedStationId: number | null;
  onSelect: (station: Station) => void;
}

export const StationsList: React.FC<StationsListProps> = ({
  stations,
  selectedStationId,
  onSelect,
}) => {
  return (
    <div
      style={{
        overflowY: "auto",
        maxHeight: "450px",
        border: "1px solid #eee",
        borderRadius: "4px",
        padding: "0.5rem",
      }}
    >
      {stations.map((station) => {
        const isSelected = station.id === selectedStationId;
        return (
          <div
            key={station.id}
            onClick={() => onSelect(station)}
            style={{
              padding: "0.5rem",
              marginBottom: "0.5rem",
              cursor: "pointer",
              backgroundColor: isSelected ? "#e0f2fe" : "#fff",
              borderRadius: "4px",
              border: isSelected ? "1px solid #0ea5e9" : "1px solid #f5f5f5",
            }}
          >
            <div style={{ fontWeight: 600 }}>{station.name}</div>
            <div style={{ fontSize: "0.85rem", color: "#555" }}>
              {station.city}
            </div>
          </div>
        );
      })}

      {stations.length === 0 && <div>No stations found.</div>}
    </div>
  );
};
