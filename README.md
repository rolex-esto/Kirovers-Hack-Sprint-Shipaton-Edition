# Team Weather Lang — Philippine Weather Decision Companion

A real-time Philippine weather decision-support dashboard that empowers Filipinos to plan travel, evaluate daily commutes, monitor flood risks, locate evacuation shelters, and prepare for typhoons with confidence.

**Live Application:** [https://kiroverse-hack-sprint-shipaton-edition.vercel.app/](https://kiroverse-hack-sprint-shipaton-edition.vercel.app/)

---

## Key Features & Capabilities

### 1. Safety & Disaster Preparedness
- **PAGASA TCWS Warnings & Rainfall Advisories** — Real-time Tropical Cyclone Wind Signals (Signal 1 to 5) and Color-Coded Rainfall warnings (Yellow, Orange, Red) mapped directly to regional coordinates.
- **Evacuation Center Locator** — Live nearby shelter finder querying OpenStreetMap Overpass API within search radiuses, showing distances and one-tap Google Maps directions.
- **Emergency Hotlines** — Regional Office of Civil Defense (OCD) numbers and national 911 / NDRRMC / Red Cross emergency hotlines with tap-to-call support.
- **Weather Alerts & Typhoon Banner** — High-visibility alerts for extreme heat indices, heavy rainfall, high wind gusts, and seasonal storm advisories.

### 2. Intelligent Decision-Support Tools
- **Kuya Weather Assistant** — Natural-language Taglish meteorological advisor capable of parsing intent for current weather, 7-day forecasts, flood risk modeling, heat index dangers, travel safety, and multi-region comparisons.
- **Trip Go / No-Go Checker** — Weighted rule-engine evaluating wind, rain probability, visibility, and road hazards to provide a clear GO, CAUTION, or NO-GO travel verdict.
- **Transport Surge Predictor** — Weather-driven surge multiplier forecasting for Grab, Angkas, Jeepneys, and walking routes with optimal departure timing.
- **Smart Optimization Panel & Activity Planner** — Multi-criteria decision engine for running, hiking, beach trips, laundry, and commuting.

### 3. Meteorological Analytics & Visualization
- **Live Rain Radar (RainViewer)** — Real-time animated precipitation radar over the Philippine archipelago locked to national bounds.
- **7-Day Forecast & Hourly Timeline** — Interactive temperature, precipitation probability, humidity, and wind trend charts built with Recharts.
- **Historical Comparison** — Comparative analysis of current temperatures and rainfall against historical 10-year meteorological baselines (Open-Meteo Archive API).
- **Side-by-Side Region Comparison** — Multi-region weather differential analyzer across all 17 administrative regions.

### 4. Accessibility & Quality of Life
- **Clean SVG Iconography** — Professional, accessible SVG icons replacing ambiguous emojis across all widgets.
- **Light & Dark Theme** — Comprehensive color system with high-contrast mode and system preference auto-detection.
- **Instant City Search & Geolocation** — Quick switcher covering 50+ Philippine cities and automated GPS location detection.
- **Forecast Sharing & Favorites** — Quick clipboard/native share sheet and persistent saved region management via localStorage.

---

## Technical Architecture

| Layer | Technology | Description |
|-------|-----------|-------------|
| **Frontend Framework** | React 18 + TypeScript | Component-driven reactive UI architecture |
| **Build Tool** | Vite | Lightning-fast HMR and optimized production bundling |
| **Visualizations** | Recharts + Leaflet | Responsive time-series charts & interactive radar tiles |
| **Live Weather API** | [Open-Meteo](https://open-meteo.com/) | Live 7-day hourly & daily forecasting |
| **Air Quality & Archive** | Open-Meteo AQI & Archive | Real-time AQI metrics & 10-year historical weather patterns |
| **Radar Imagery** | [RainViewer API](https://www.rainviewer.com/api.html) | Live radar composite animation over the Philippines |
| **Geospatial Shelters** | OpenStreetMap Overpass API | Real-time querying of civic shelters and assembly points |
| **Caching Layer** | Browser `localStorage` | TTL-based caching (30m forecast, 60m AQI/evacuation) with fallback |
| **Offline Pipeline** | DuckDB (Node.js) | Optional offline Parquet generation in `pipeline/` |
| **Deployment** | Vercel | Global edge CDN deployment |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/rolex-esto/portfolio.git
cd Kirovers-Hack-Sprint-Shipaton-Edition

# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Run test suite (Vitest)
npm test

# Build for production
npm run build
```

---

## Covered Philippine Regions & Cities

All 17 administrative regions and major urban hubs are fully indexed:

- **Luzon:** National Capital Region (NCR), Cordillera Administrative Region (CAR), Ilocos (Region I), Cagayan Valley (Region II), Central Luzon (Region III), CALABARZON (Region IV-A), MIMAROPA (Region IV-B), Bicol (Region V).
- **Visayas:** Western Visayas (Region VI), Central Visayas (Region VII), Eastern Visayas (Region VIII).
- **Mindanao:** Zamboanga Peninsula (Region IX), Northern Mindanao (Region X), Davao (Region XI), SOCCSKSARGEN (Region XII), Caraga (Region XIII), Bangsamoro (BARMM).

---

## License

MIT License. Developed for Filipino resilience and community safety.

---

## Author

**Gee Espiritu** ([@debiangee](https://github.com/debiangee))

Built for the Kiro Speed Hackathon Week 9
