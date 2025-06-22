import {  DataTable } from '@/components/share/data-table';
import React from 'react'

import data from "./data.json"

export default function Page() {
  return (
    <div>
      <DataTable data={data} columns={[]} />
    </div>
  )
}
