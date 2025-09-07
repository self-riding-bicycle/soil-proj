"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, XCircle, MapPin } from "lucide-react"
import { useLocation } from "@/contexts/location-context"

export function MainTabs() {
  const { coordinateInfo } = useLocation()
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
              
              {/* Main content area - Soil Analysis Results */}
              <div className="flex-1 p-6">
                {coordinateInfo ? (
                  <div className="flex h-full">
                    {/* Analysis Results - Center */}
                    <div className="flex-1 pr-6">
                      <h3 className="text-lg font-semibold mb-4">Soil Carbon Analysis</h3>
                    
                    <div className="space-y-4">
                      {/* Total Organic Carbon */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-medium text-gray-600">Total Organic Carbon (TOC)</h4>
                          <span className="text-2xl font-bold">2.34%</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Moderate carbon content. Recommended range for agricultural soil: 2-4%
                        </p>
                      </div>

                      {/* Active Carbon */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-medium text-gray-600">Active Carbon</h4>
                          <span className="text-2xl font-bold">485 ppm</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Good microbial activity indicator. Optimal range: 400-600 ppm
                        </p>
                      </div>

                      {/* Soil Organic Matter */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-medium text-gray-600">Soil Organic Matter (SOM)</h4>
                          <span className="text-2xl font-bold">4.03%</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Healthy organic matter levels. Target range: 3-5% for cropland
                        </p>
                      </div>

                      {/* Carbon Sequestration Potential */}
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Carbon Sequestration Potential</h4>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-blue-700">1.2-1.8</span>
                          <span className="text-sm text-gray-600">tons CO₂/acre/year</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          With recommended practices, this field could sequester additional carbon
                        </p>
                      </div>

                      {/* Recommendations */}
                      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="text-sm font-semibold text-green-800 mb-2">Recommendations</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Consider cover cropping to increase carbon inputs</li>
                          <li>• Reduce tillage to preserve existing carbon stocks</li>
                          <li>• Apply compost or biochar to enhance carbon storage</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Score - Right Column */}
                  <div className="w-32 border-l border-gray-200 pl-6 flex flex-col items-center">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-black mb-1">87%</div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide">Confidence</div>
                    </div>

                    {/* LED Visualization */}
                    <div className="flex flex-col gap-1">
                      {[...Array(10)].map((_, i) => {
                        const level = 10 - i; // Level from top (1) to bottom (10)
                        const threshold = level * 10;
                        const confidence = 87;
                        const isActive = confidence >= threshold;
                        
                        let bgColor = 'bg-gray-300';
                        if (isActive) {
                          // Colors from bottom up (like a VU meter)
                          if (level <= 6) bgColor = 'bg-green-500';      // Bottom 6 bars are green
                          else if (level <= 8) bgColor = 'bg-yellow-400'; // Next 2 bars are yellow
                          else if (level <= 9) bgColor = 'bg-orange-400'; // Next 1 bar is orange
                          else bgColor = 'bg-red-500';                    // Top bar is red
                        }
                        
                        return (
                          <div
                            key={i}
                            className={`w-16 h-3 rounded-sm ${bgColor} ${
                              isActive ? 'shadow-sm' : ''
                            }`}
                          />
                        );
                      })}
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-600">Based on</p>
                      <p className="text-xs font-medium">2 datasets</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Location Selected</h3>
                    <p className="text-sm text-gray-600 max-w-sm">
                      Enter GPS coordinates above to view soil carbon analysis for your location
                    </p>
                  </div>
                </div>
              )}
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