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
}

export function GpsInput() {
  const [coordinates, setCoordinates] = useState("")
  const [coordinateInfo, setCoordinateInfo] = useState<CoordinateInfo | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Parse coordinates (format: "lat, lng" from Google Maps)
    const parts = coordinates.split(",").map(p => p.trim())
    if (parts.length === 2) {
      const lat = parseFloat(parts[0])
      const lng = parseFloat(parts[1])
      
      if (!isNaN(lat) && !isNaN(lng)) {
        // For now, just set the coordinates
        // In a real app, you'd call a geocoding API here
        setCoordinateInfo({
          lat,
          lng,
          country: "United States",
          state: "California",
          city: "San Francisco"
        })
      }
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
                    {coordinateInfo.city}, {coordinateInfo.state}, {coordinateInfo.country}
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