import { NextRequest, NextResponse } from 'next/server'

// Mock soil carbon data generator based on location
function generateSoilData(lat: number, lng: number) {
  // Use lat/lng to generate somewhat consistent but varied data
  const seed = Math.abs(lat * 1000 + lng * 1000) % 100
  
  // Base values with location-based variation
  const baseTOC = 1.8 + (seed % 30) / 10 // 1.8 - 4.8%
  const baseActiveCarbon = 350 + (seed % 40) * 10 // 350 - 750 ppm
  const baseSOM = 3.0 + (seed % 35) / 10 // 3.0 - 6.5%
  
  // Determine data availability based on location
  const hasLowFidelity = seed % 3 !== 0 // ~66% have low fidelity data
  const hasHighFidelity = seed % 5 === 0 // ~20% have high fidelity data
  
  return {
    location: {
      lat: parseFloat(lat.toFixed(5)),
      lng: parseFloat(lng.toFixed(5))
    },
    dataAvailability: {
      satellite: true, // Always available
      lowFidelity: hasLowFidelity,
      highFidelity: hasHighFidelity
    },
    soilMetrics: {
      toc: {
        value: parseFloat(baseTOC.toFixed(2)),
        unit: '%',
        label: 'Total Organic Carbon',
        description: 'Moderate to good carbon content for agricultural soil'
      },
      activeCarbon: {
        value: Math.round(baseActiveCarbon),
        unit: 'ppm',
        label: 'Active Carbon',
        description: 'Indicator of microbial activity'
      },
      som: {
        value: parseFloat(baseSOM.toFixed(2)),
        unit: '%',
        label: 'Soil Organic Matter',
        description: 'Organic matter content in soil'
      },
      ph: {
        value: parseFloat((6.0 + (seed % 20) / 10).toFixed(1)),
        unit: '',
        label: 'pH',
        description: 'Soil acidity/alkalinity'
      },
      nitrogen: {
        value: parseFloat((0.15 + (seed % 15) / 100).toFixed(3)),
        unit: '%',
        label: 'Total Nitrogen',
        description: 'Total nitrogen content'
      },
      phosphorus: {
        value: Math.round(25 + (seed % 50)),
        unit: 'ppm',
        label: 'Available Phosphorus',
        description: 'Plant-available phosphorus'
      },
      potassium: {
        value: Math.round(100 + (seed % 150)),
        unit: 'ppm',
        label: 'Available Potassium',
        description: 'Plant-available potassium'
      },
      cec: {
        value: parseFloat((10 + (seed % 10)).toFixed(1)),
        unit: 'meq/100g',
        label: 'Cation Exchange Capacity',
        description: 'Soil nutrient holding capacity'
      },
      bulkDensity: {
        value: parseFloat((1.2 + (seed % 4) / 10).toFixed(2)),
        unit: 'g/cm³',
        label: 'Bulk Density',
        description: 'Soil compaction indicator'
      },
      moistureContent: {
        value: parseFloat((15 + (seed % 20)).toFixed(1)),
        unit: '%',
        label: 'Moisture Content',
        description: 'Current soil moisture level'
      }
    },
    sequestrationPotential: {
      min: parseFloat((0.8 + (seed % 10) / 10).toFixed(1)),
      max: parseFloat((1.5 + (seed % 15) / 10).toFixed(1)),
      unit: 'tons CO₂/acre/year'
    },
    nearbyComparison: {
      tocPercentile: 50 + Math.round((seed % 40) - 20),
      activeCarbonPercentile: 50 + Math.round((seed % 40) - 20),
      somPercentile: 50 + Math.round((seed % 40) - 20),
      seqPercentile: 50 + Math.round((seed % 40) - 20),
      totalFieldsCompared: 35 + Math.round(seed % 30),
      radius: 10
    },
    recommendations: [
      'Consider cover cropping to increase carbon inputs',
      'Monitor soil moisture levels for optimal microbial activity',
      seed % 2 === 0 ? 'Reduce tillage to preserve carbon stocks' : 'Apply compost to enhance organic matter',
      hasHighFidelity ? 'High-fidelity data suggests targeted nutrient management' : 'Consider soil testing for more accurate measurements'
    ],
    timestamp: new Date().toISOString(),
    dataSource: 'OSSL-derived mock data',
    confidence: {
      satellite: 62,
      lowFidelity: 65,
      highFidelity: 85,
      combined: hasHighFidelity ? 85 : (hasLowFidelity ? 72 : 62)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { latitude, longitude } = body

    // Validate coordinates
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json(
        { error: 'Invalid coordinates. Please provide numeric latitude and longitude.' },
        { status: 400 }
      )
    }

    if (latitude < -90 || latitude > 90) {
      return NextResponse.json(
        { error: 'Latitude must be between -90 and 90 degrees.' },
        { status: 400 }
      )
    }

    if (longitude < -180 || longitude > 180) {
      return NextResponse.json(
        { error: 'Longitude must be between -180 and 180 degrees.' },
        { status: 400 }
      )
    }

    // Generate soil data based on coordinates
    const soilData = generateSoilData(latitude, longitude)

    // Add CORS headers for Vercel deployment
    return NextResponse.json(soilData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error processing soil carbon request:', error)
    return NextResponse.json(
      { error: 'Internal server error processing request' },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Soil Carbon API',
    description: 'POST GPS coordinates to get soil carbon data',
    example: {
      method: 'POST',
      body: {
        latitude: 41.54942,
        longitude: -70.61673
      }
    }
  })
}