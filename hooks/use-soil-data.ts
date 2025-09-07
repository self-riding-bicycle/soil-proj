import { useState, useEffect } from 'react'

interface SoilData {
  location: {
    lat: number
    lng: number
  }
  dataAvailability: {
    satellite: boolean
    lowFidelity: boolean
    highFidelity: boolean
  }
  soilMetrics: {
    toc: { value: number; unit: string; label: string; description: string }
    activeCarbon: { value: number; unit: string; label: string; description: string }
    som: { value: number; unit: string; label: string; description: string }
    ph: { value: number; unit: string; label: string; description: string }
    nitrogen: { value: number; unit: string; label: string; description: string }
    phosphorus: { value: number; unit: string; label: string; description: string }
    potassium: { value: number; unit: string; label: string; description: string }
    cec: { value: number; unit: string; label: string; description: string }
    bulkDensity: { value: number; unit: string; label: string; description: string }
    moistureContent: { value: number; unit: string; label: string; description: string }
  }
  sequestrationPotential: {
    min: number
    max: number
    unit: string
  }
  nearbyComparison: {
    tocPercentile: number
    activeCarbonPercentile: number
    somPercentile: number
    seqPercentile: number
    totalFieldsCompared: number
    radius: number
  }
  recommendations: string[]
  confidence: {
    satellite: number
    lowFidelity: number
    highFidelity: number
    combined: number
  }
}

export function useSoilData(latitude: number | null, longitude: number | null) {
  const [data, setData] = useState<SoilData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (latitude === null || longitude === null) {
      setData(null)
      return
    }

    const fetchSoilData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch('/api/soil-carbon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude,
            longitude,
          }),
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch soil data: ${response.statusText}`)
        }

        const soilData = await response.json()
        setData(soilData)
      } catch (err) {
        console.error('Error fetching soil data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch soil data')
      } finally {
        setLoading(false)
      }
    }

    fetchSoilData()
  }, [latitude, longitude])

  return { data, loading, error }
}