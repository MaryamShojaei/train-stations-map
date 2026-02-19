// import { describe, it, beforeEach, vi, expect } from "vitest";
// import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import App from "./App";
// import * as api from "./api/stationsApi";

// vi.mock("./api/stationsApi");



// const mockStations = [
//   { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.525, lng: 13.369 },
//   { id: 2, name: "Munich Hbf", city: "Munich", lat: 48.14, lng: 11.56 },
// ];

// describe("App", () => {
//   beforeEach(() => {
//     (api.fetchStations as unknown as vi.Mock).mockResolvedValue(mockStations);
//   });

//   it("filters stations by city name", async () => {
//     render(<App />);

//     // صبر کن دیتا لود بشه
//     await waitFor(() =>
//       expect(screen.getByText("Berlin Hbf")).toBeInTheDocument(),
//     );

//     const input = screen.getByPlaceholderText("Type a city name...");
//     fireEvent.change(input, { target: { value: "munich" } });

//     // باید فقط مونیخ ببینیم
//     expect(screen.getByText("Munich Hbf")).toBeInTheDocument();
//     expect(screen.queryByText("Berlin Hbf")).not.toBeInTheDocument();
//   });
// });
import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import * as api from "./api/stationsApi";

vi.mock("./api/stationsApi");

const mockStations = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.525, lng: 13.369 },
  { id: 2, name: "Munich Hbf", city: "Munich", lat: 48.14, lng: 11.56 },
];

describe("App", () => {
  beforeEach(() => {
    (api.fetchStations as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockStations,
    );
  });

  it("filters stations by city name", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByText("Berlin Hbf")).toBeInTheDocument(),
    );

    const input = screen.getByPlaceholderText("Type a city name...");
    fireEvent.change(input, { target: { value: "munich" } });

    expect(screen.getByText("Munich Hbf")).toBeInTheDocument();
    expect(screen.queryByText("Berlin Hbf")).not.toBeInTheDocument();
  });
});
