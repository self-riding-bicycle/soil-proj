import { Navbar } from "@/components/navbar"
import { GpsInput } from "@/components/gps-input"
import { MainTabs } from "@/components/main-tabs"
import { LocationProvider } from "@/contexts/location-context"

export default function Home() {
  return (
    <LocationProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <GpsInput />
        <MainTabs />
      </div>
    </LocationProvider>
  )
}