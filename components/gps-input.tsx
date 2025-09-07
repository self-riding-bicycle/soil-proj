"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CoordinateInfo {
  lat: number
  lng: number
  country?: string
  state?: string
  city?: string
  region?: string
}

export function GpsInput() {
  const [coordinates, setCoordinates] = useState("")
  const [coordinateInfo, setCoordinateInfo] = useState<CoordinateInfo | null>(null)

  const getApproximateLocation = (lat: number, lng: number): Partial<CoordinateInfo> => {
    // Basic location approximation based on coordinates
    // This is a simplified version - in production, use a proper geocoding API
    
    // US Regions (very approximate)
    if (lat >= 24 && lat <= 49 && lng >= -125 && lng <= -66) {
      // Within continental US bounds
      if (lat >= 40 && lat <= 43 && lng >= -72 && lng <= -69) {
        return {
          country: "United States",
          state: "Massachusetts",
          region: "Cape Cod area"
        }
      } else if (lat >= 36 && lat <= 38 && lng >= -123 && lng <= -121) {
        return {
          country: "United States", 
          state: "California",
          city: "San Francisco Bay Area"
        }
      } else if (lat >= 40 && lat <= 41 && lng >= -74.5 && lng <= -73.5) {
        return {
          country: "United States",
          state: "New York",
          city: "New York City"
        }
      } else {
        return {
          country: "United States",
          region: "Location requires geocoding API"
        }
      }
    }
    
    return {
      country: "Unknown",
      region: "Coordinates outside mapped regions"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Parse coordinates - handle both comma and space separated formats
    const cleanedCoords = coordinates.replace(/[^\d\s,.-]/g, '')
    const parts = cleanedCoords.split(/[,\s]+/).filter(p => p.length > 0)
    
    if (parts.length === 2) {
      const lat = parseFloat(parts[0])
      const lng = parseFloat(parts[1])
      
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        const location = getApproximateLocation(lat, lng)
        setCoordinateInfo({
          lat,
          lng,
          ...location
        })
      } else {
        alert("Invalid coordinates. Latitude must be between -90 and 90, Longitude between -180 and 180")
      }
    } else {
      alert("Please enter coordinates in format: latitude, longitude")
    }
  }

  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter GPS coordinates (e.g., 37.7749, -122.4194)"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit">
                <MapPin className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </form>
          </div>

          {/* Summary Section */}
          <div className="flex items-center">
            {coordinateInfo ? (
              <div className="text-sm space-y-1">
                <div className="flex gap-4">
                  <span className="text-muted-foreground">Latitude:</span>
                  <span className="font-medium">{coordinateInfo.lat.toFixed(4)}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground">Longitude:</span>
                  <span className="font-medium">{coordinateInfo.lng.toFixed(4)}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">
                    {[
                      coordinateInfo.city,
                      coordinateInfo.region,
                      coordinateInfo.state,
                      coordinateInfo.country
                    ].filter(Boolean).join(", ")}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Enter GPS coordinates to see location details
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}