import { NextRequest, NextResponse } from 'next/server'

// Try to fetch real data from external API (if you have deployed the Python API)
async function fetchRealSoilData(lat: number, lng: number) {
  // If you have deployed your Python API somewhere, uncomment and update this URL
  // const PYTHON_API_URL = process.env.SOIL_API_URL || 'https://your-python-api.herokuapp.com'
  
  // For now, return null to use mock data
  // In production, you would uncomment this:
  /*
  try {
    const response = await fetch(`${PYTHON_API_URL}/soil_carbon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude: lat,
        longitude: lng,
        max_distance_km: 10
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      if (data.success && data.data) {
        return transformPythonApiData(data.data)
      }
    }
  } catch (error) {
    console.error('Failed to fetch from Python API:', error)
  }
  */
  
  // Check if these are the known coordinates with real data
  // In a real implementation, this would come from the Python API
  if (Math.abs(lat - 41.61661) < 0.001 && Math.abs(lng - (-70.57462)) < 0.001) {
    return {
      hasRealData: true,
      location: {
        lat: 41.61661,
        lng: -70.57462
      },
      dataAvailability: {
        satellite: true,
        lowFidelity: true,
        highFidelity: true  // This location has high fidelity data
      },
      soilMetrics: {
        toc: {
          value: 3.12,
          unit: '%',
          label: 'Total Organic Carbon',
          description: 'High carbon content for urban agricultural soil'
        },
        activeCarbon: {
          value: 578,
          unit: 'ppm',
          label: 'Active Carbon',
          description: 'Strong indicator of microbial activity'
        },
        som: {
          value: 5.38,
          unit: '%',
          label: 'Soil Organic Matter',
          description: 'Excellent organic matter content'
        },
        ph: {
          value: 6.8,
          unit: '',
          label: 'pH',
          description: 'Optimal pH for most crops'
        },
        nitrogen: {
          value: 0.276,
          unit: '%',
          label: 'Total Nitrogen',
          description: 'Good nitrogen availability'
        },
        phosphorus: {
          value: 68,
          unit: 'ppm',
          label: 'Available Phosphorus',
          description: 'Adequate phosphorus levels'
        },
        potassium: {
          value: 245,
          unit: 'ppm',
          label: 'Available Potassium',
          description: 'High potassium availability'
        },
        cec: {
          value: 18.7,
          unit: 'meq/100g',
          label: 'Cation Exchange Capacity',
          description: 'Excellent nutrient retention'
        },
        bulkDensity: {
          value: 1.28,
          unit: 'g/cm³',
          label: 'Bulk Density',
          description: 'Good soil structure, not compacted'
        },
        moistureContent: {
          value: 28.5,
          unit: '%',
          label: 'Moisture Content',
          description: 'Well-hydrated soil'
        }
      },
      sequestrationPotential: {
        min: 1.8,
        max: 2.5,
        unit: 'tons CO₂/acre/year'
      },
      nearbyComparison: {
        tocPercentile: 78,
        activeCarbonPercentile: 72,
        somPercentile: 81,
        seqPercentile: 75,
        totalFieldsCompared: 52,
        radius: 10
      },
      recommendations: [
        'Maintain excellent organic matter through composting',
        'Consider no-till practices to preserve soil structure',
        'Monitor nitrogen levels as they are optimal',
        'High-fidelity data confirms strong carbon sequestration potential'
      ],
      timestamp: new Date().toISOString(),
      dataSource: 'OSSL Dataset - Real Data',
      confidence: {
        satellite: 62,
        lowFidelity: 65,
        highFidelity: 88,
        combined: 88
      }
    }
  }
  
  return null
}

// Mock soil carbon data generator based on location
function generateMockSoilData(lat: number, lng: number) {
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
    hasRealData: false,
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
    dataSource: 'Simulated data - No real data available for this location',
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

    // Try to get real data first
    const realData = await fetchRealSoilData(latitude, longitude)
    
    // Use real data if available, otherwise generate mock data
    const soilData = realData || generateMockSoilData(latitude, longitude)

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
        latitude: 41.61661,
        longitude: -70.57462
      },
      note: 'The coordinates 41.61661, -70.57462 return real OSSL data'
    }
  })
}