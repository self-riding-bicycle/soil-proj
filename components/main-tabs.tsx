"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, XCircle } from "lucide-react"

export function MainTabs() {
  // Data availability (what we have)
  const dataAvailability = {
    satellite: true,      // Always available
    lowFidelity: true,    // Available in this example
    highFidelity: false   // Not available in this example
  }

  // Data usage toggles (what we want to use in analysis)
  const [enabledDatasets, setEnabledDatasets] = useState({
    satellite: true,      // Enabled by default
    lowFidelity: true,    // Enabled by default if available
    highFidelity: false   // Disabled (not available)
  })

  const handleDatasetToggle = (dataset: keyof typeof enabledDatasets) => {
    // Only allow toggling if data is available
    if (dataAvailability[dataset]) {
      setEnabledDatasets(prev => ({
        ...prev,
        [dataset]: !prev[dataset]
      }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="local-soil" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="local-soil">Local Soil Conditions</TabsTrigger>
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
          <TabsTrigger value="send">Send Sample</TabsTrigger>
          <TabsTrigger value="request">Request Instrument</TabsTrigger>
        </TabsList>
        
        <TabsContent value="local-soil" className="mt-6">
          <div className="rounded-lg border min-h-[400px] overflow-hidden">
            <div className="flex h-full min-h-[400px]">
              {/* Dataset selection column */}
              <div className="p-6 pr-8 border-r border-gray-200 min-h-full">
                <div className="space-y-4">
                  {/* Satellite Data */}
                  <div className="flex items-center space-x-3">
                    {dataAvailability.satellite ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-400" />
                    )}
                    <Checkbox
                      checked={enabledDatasets.satellite}
                      onCheckedChange={() => handleDatasetToggle('satellite')}
                      disabled={!dataAvailability.satellite}
                      id="satellite"
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor="satellite"
                      className={`text-sm font-medium cursor-pointer ${
                        !dataAvailability.satellite ? 'text-gray-400' : ''
                      }`}
                    >
                      Satellite
                    </label>
                  </div>
                  
                  {/* Low Fidelity Spectroscopy */}
                  <div className="flex items-center space-x-3">
                    {dataAvailability.lowFidelity ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-400" />
                    )}
                    <Checkbox
                      checked={enabledDatasets.lowFidelity}
                      onCheckedChange={() => handleDatasetToggle('lowFidelity')}
                      disabled={!dataAvailability.lowFidelity}
                      id="lowFidelity"
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor="lowFidelity"
                      className={`text-sm font-medium cursor-pointer ${
                        !dataAvailability.lowFidelity ? 'text-gray-400' : ''
                      }`}
                    >
                      Low Fidelity Spectroscopy
                    </label>
                  </div>
                  
                  {/* High Fidelity Spectroscopy */}
                  <div className="flex items-center space-x-3">
                    {dataAvailability.highFidelity ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-400" />
                    )}
                    <Checkbox
                      checked={enabledDatasets.highFidelity}
                      onCheckedChange={() => handleDatasetToggle('highFidelity')}
                      disabled={!dataAvailability.highFidelity}
                      id="highFidelity"
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor="highFidelity"
                      className={`text-sm font-medium ${
                        !dataAvailability.highFidelity ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      High Fidelity Spectroscopy
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Main content area - placeholder for future content */}
              <div className="flex-1 p-6">
                {/* Content will go here */}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="upload" className="mt-6">
          <div className="rounded-lg border p-6 min-h-[400px]">
            {/* Upload Data tab content - currently blank */}
          </div>
        </TabsContent>
        
        <TabsContent value="send" className="mt-6">
          <div className="rounded-lg border p-6 min-h-[400px]">
            {/* Send Sample tab content - currently blank */}
          </div>
        </TabsContent>
        
        <TabsContent value="request" className="mt-6">
          <div className="rounded-lg border p-6 min-h-[400px]">
            {/* Request Instrument tab content - currently blank */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}