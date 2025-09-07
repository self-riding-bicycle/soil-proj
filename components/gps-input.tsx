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
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Side: Input and Location Info */}
          <div className="space-y-2">
            {/* Input Section */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter GPS coordinates (e.g., 37.7749, -122.4194)"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                  className="w-full h-9"
                />
              </div>
              <Button type="submit" className="h-9">
                <MapPin className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </form>

            {/* Location Summary Below Input */}
            {coordinateInfo ? (
              <div className="text-sm space-y-0.5 pl-2">
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
              <p className="text-sm text-muted-foreground pl-2">
                Enter GPS coordinates to see location details
              </p>
            )}
          </div>

          {/* Right Side: Map */}
          <div className="flex items-center justify-end">
            {coordinateInfo && (
              <div className="relative overflow-hidden rounded-lg border shadow-sm bg-gray-100">
                <iframe
                  width="400"
                  height="100"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinateInfo.lng-0.02},${coordinateInfo.lat-0.015},${coordinateInfo.lng+0.02},${coordinateInfo.lat+0.015}&layer=mapnik&marker=${coordinateInfo.lat},${coordinateInfo.lng}`}
                  style={{ border: 0 }}
                  title={`Map showing location at ${coordinateInfo.lat}, ${coordinateInfo.lng}`}
                />
                <div className="absolute bottom-1 right-1 bg-white/90 px-1 py-0.5 rounded text-xs">
                  <a 
                    href={`https://www.openstreetmap.org/?mlat=${coordinateInfo.lat}&mlon=${coordinateInfo.lng}#map=14/${coordinateInfo.lat}/${coordinateInfo.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View larger
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}