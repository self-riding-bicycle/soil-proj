"use client"

import React, { createContext, useContext, useState } from 'react'

interface CoordinateInfo {
  lat: number
  lng: number
  country?: string
  state?: string
  city?: string
  region?: string
}

interface LocationContextType {
  coordinateInfo: CoordinateInfo | null
  setCoordinateInfo: (info: CoordinateInfo | null) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [coordinateInfo, setCoordinateInfo] = useState<CoordinateInfo | null>(null)

  return (
    <LocationContext.Provider value={{ coordinateInfo, setCoordinateInfo }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}