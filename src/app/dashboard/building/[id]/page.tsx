'use client'
import BuildingForm from '@/components/app/building/building-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BuildingFormValues } from '@/schemas/building-schema'
import { AdminGetBuildingById } from '@/services/building-service'
import { useBuilding } from '@/stores/building'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

function Page() {
  const params = useParams() as { id: string }
  const { updateBuilding, error, clearError } = useBuilding()

  const [defaultValues, setDefaultValues] = useState<BuildingFormValues>()

  const buildingData = useCallback(async () => {
    const result = await AdminGetBuildingById(params.id)
    if (result.success) {
      setDefaultValues(result.data)
    }
    return
  }, [params.id])

  const onSubmit = async (data: BuildingFormValues) => {
    try {
      await updateBuilding(params.id, data)

      if (error == null) {
        toast.success('Building updated successfully!')
        // Reset form หรือ redirect
        return
      } else {
        toast.error(error || 'Failed to update building')
        clearError()
      }
    } catch (error) {
      console.error(error)
      toast.error('An unexpected error occurred')
    }
  }

  useEffect(() => {
    buildingData()
  }, [buildingData])
  return (
    <>
      <Tabs defaultValue="edit">
        <div className="space-y-6 w-full max-w-4xl mx-auto pt-3">
          <TabsList>
            <TabsTrigger value="edit">Building Information</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="edit">
          <BuildingForm defaultValues={defaultValues} onSubmit={onSubmit} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Page
