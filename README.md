# Train Stations in Germany

A small React + TypeScript app that displays German train stations on an interactive map using React-Leaflet.  
You can filter stations by city name and see their locations on the map.

## Features

- List of train stations with name and city
- Text input to filter stations by city (e.g. `Berlin`, `Munich`, `Hamburg`)
- Map with markers for all filtered stations
- Automatic map recenter and zoom when:
  - You change the city filter (focus on the first station of that city)
  - You click a station in the list
- Popup on marker click showing station name and city

## Tech Stack

- React + TypeScript + Vite
- React-Leaflet + Leaflet
- Vitest + React Testing Library for unit tests

## Getting Started

```bash
git clone <https://github.com/MaryamShojaei/train-stations-map>
cd panto-clean

npm install
npm run dev
```
