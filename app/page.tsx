import { Navbar } from "@/components/navbar"
import { GpsInput } from "@/components/gps-input"
import { MainTabs } from "@/components/main-tabs"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <GpsInput />
      <MainTabs />
    </div>
  )
}