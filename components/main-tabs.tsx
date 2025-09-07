"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MainTabs() {
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
          <div className="rounded-lg border p-6 min-h-[400px]">
            {/* Answer tab content - currently blank */}
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