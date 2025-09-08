# Farm Field Soil Analysis

A web application for farmers to analyze and monitor soil carbon metrics and health indicators for their agricultural fields using GPS coordinates.

## 🌱 Overview

This prototype application helps farmers assess soil health by providing comprehensive analysis of carbon content, organic matter, and other critical soil metrics. Users can input GPS coordinates to receive location-specific soil data, compare their fields to nearby farms, and get personalized recommendations for improving soil health and carbon sequestration.

## ⚠️ Prototype Status

**This is currently a prototype application** that primarily uses mock data for demonstration purposes. The system includes:

- **Mock Data Generation**: Most soil analysis results are algorithmically generated based on GPS coordinates to provide consistent but simulated data
- **Experimental Real Data**: Limited real soil data is available for specific coordinates (41.61661, -70.57462)
- **API Infrastructure**: Ready to integrate with real OSSL (Open Soil Spectral Library) dataset when available

## ✨ Features

### Core Functionality
- **GPS Coordinate Input**: Enter coordinates manually, use browser geolocation, or use demo coordinates
- **Soil Carbon Analysis**: View key metrics including Total Organic Carbon (TOC), Active Carbon, and Soil Organic Matter (SOM)
- **Data Source Selection**: Choose between available data sources (Satellite, Low/High Fidelity Spectroscopy)
- **Confidence Scoring**: Dynamic confidence ratings based on selected data sources
- **Nearby Field Comparison**: See how your field ranks against similar fields in the area
- **Upload Soil Data**: Manual entry form for lab test results
- **Carbon Sequestration Potential**: Estimates for CO₂ capture capacity

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Map**: Visual location display using OpenStreetMap
- **Visual Indicators**: LED-style confidence meter and percentile range bars
- **Data Availability Status**: Clear indicators for available data sources

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd soil-proj
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Using the Application

1. **Enter GPS Coordinates**: 
   - Type coordinates manually (e.g., "41.61661, -70.57462")
   - Click the compass icon to use your current location
   - Click the flask icon to use demo coordinates with sample data

2. **Submit Coordinates**: Click the Submit button to fetch soil analysis

3. **View Analysis**: Navigate through tabs to see:
   - Local Soil Conditions with carbon metrics
   - Data upload form for manual entry
   - Future features for sample sending and instrument requests

## 🛠️ Technical Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Icons**: Lucide React
- **Maps**: OpenStreetMap embed API
- **State Management**: React Context API
- **API**: Next.js API Routes (Vercel-compatible)

## 📊 Data Sources

### Current Implementation (Mock Data)
- Algorithmically generated soil metrics based on GPS coordinates
- Consistent data for testing and demonstration
- Simulated comparison with "nearby fields"

### Demo Real Data
- Coordinates `41.61661, -70.57462` return enhanced data marked as "OSSL Dataset - Real Data"
- Includes all three data source types (Satellite, Low Fidelity, High Fidelity)

### Future Integration
The application includes infrastructure for connecting to:
- Python-based OSSL API (`/soil-carbon-api` directory)
- External soil database services
- Real-time satellite imagery analysis
- Laboratory test result databases

## 🔧 API Endpoints

### POST `/api/soil-carbon`
Retrieves soil data for given coordinates.

**Request:**
```json
{
  "latitude": 41.61661,
  "longitude": -70.57462
}
```

**Response:** Comprehensive soil metrics, data availability, and recommendations

## 📁 Project Structure

```
soil-proj/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── soil-carbon/   # Soil data endpoint
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── navbar.tsx         # Navigation bar
│   ├── gps-input.tsx      # GPS coordinate input
│   ├── main-tabs.tsx      # Tabbed interface
│   └── ui/                # UI components
├── contexts/              # React contexts
│   └── location-context.tsx
├── hooks/                 # Custom React hooks
│   └── use-soil-data.ts
├── soil-carbon-api/       # Python API (experimental)
└── public/                # Static assets
```

## 🚧 Limitations

- **Mock Data**: Most results are simulated and should not be used for actual farming decisions
- **Limited Geographic Coverage**: Real data only available for specific test coordinates
- **No Data Persistence**: Results are not saved between sessions
- **Simplified Location Detection**: Basic approximation without proper geocoding

## 🔮 Future Development

- Integration with real OSSL dataset
- Connection to live satellite imagery services
- User accounts and historical data tracking
- Advanced ML models for soil prediction
- Mobile application development
- Integration with precision agriculture equipment
- Carbon credit calculation and tracking

## 🤝 Contributing

This is a prototype project for demonstration purposes. For questions about real-world implementation or data integration, please contact the development team.

## 📄 License

This project is a prototype and is not licensed for production use without proper data sources and validation.

## ⚡ Quick Start with Demo Data

1. Click the flask icon (🧪) next to the GPS input
2. Click Submit to load the demo location
3. Explore the different tabs and data visualizations
4. Try toggling different data sources to see confidence changes

---

**Note**: This application is for demonstration purposes only. Do not use the displayed data for actual agricultural decisions without verification from certified soil testing laboratories.