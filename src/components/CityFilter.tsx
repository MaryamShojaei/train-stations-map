import React from "react";

interface CityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const CityFilter: React.FC<CityFilterProps> = ({ value, onChange }) => {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "0.5rem",
          textAlign: "center",
        }}
      >
        Filter by city:
      </label>
      <input
        type="text"
        placeholder="Type a city name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "260px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};
