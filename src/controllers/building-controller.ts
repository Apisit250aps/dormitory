import buildings, { Building } from '@/models/buildings'
import { BuildingSchema } from '@/schemas/building-schema'
import { IResponse } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function CreateBuilding(
  req: NextRequest
): Promise<NextResponse<IResponse<Building>>> {
  try {
    const data = await req.json()
    const result = BuildingSchema.safeParse(data)
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.message },
        { status: 400 }
      )
    }

    const unique = await buildings.findOne({ name: result.data.name })
    if (unique) {
      return NextResponse.json(
        { success: false, message: 'Building name is exist!' },
        { status: 400 }
      )
    }

    const insert = await buildings.insertOne(result.data)
    if (!insert.acknowledged) {
      throw new Error('Create building error')
    }

    return NextResponse.json<IResponse<Building>>(
      {
        success: true,
        message: '',
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    )
  }
}
