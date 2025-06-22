'use client'

import { DataTable } from '@/components/share/data-table'
import React from 'react'

import { buildingColumn } from '@/components/app/building/building-column'
import { useBuilding } from '@/stores/building';

export default function Page() {
  const {buildings} = useBuilding()
  return (
    <div className='pt-3'>
      <DataTable data={buildings} columns={buildingColumn} />
    </div>
  )
}
