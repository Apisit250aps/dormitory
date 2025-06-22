import buildings, { Building } from '@/models/buildings'
import { BuildingSchema } from '@/schemas/building-schema'
import { IPagination, IResponse, QueryParams } from '@/types/types'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

/**
 * CREATE: Add a new building
 */
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

    const exists = await buildings.findOne({ name: result.data.name })
    if (exists) {
      return NextResponse.json(
        { success: false, message: 'Building name already exists.' },
        { status: 400 }
      )
    }

    const insert = await buildings.insertOne(result.data)
    if (!insert.acknowledged) {
      throw new Error('Failed to create building.')
    }

    return NextResponse.json<IResponse<Building>>(
      {
        success: true,
        message: 'Building created successfully.',
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'Internal server error.',
      },
      { status: 500 }
    )
  }
}

/**
 * READ: Get multiple buildings with pagination
 */
export async function GetBuildings(
  req: NextRequest
): Promise<NextResponse<IResponse<IPagination<Building>>>> {
  try {
    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    const skip = (page - 1) * limit

    const [totalDocs, items] = await Promise.all([
      buildings.countDocuments(),
      buildings.find({}).skip(skip).limit(limit).sort({ name: 1 }),
    ])

    const docs = await items.toArray()

    return NextResponse.json(
      {
        success: true,
        message: 'Documents',
        data: {
          docs,
          page,
          limit,
          totalDocs,
          totalPages: Math.ceil(totalDocs / limit),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'Internal server error.',
      },
      { status: 500 }
    )
  }
}

/**
 * READ: Get a single building by ID
 */
export async function GetBuildingById(
  req: NextRequest,
  { params }: QueryParams
): Promise<NextResponse<IResponse<Building>>> {
  try {
    const { id } = await params
    const building = await buildings.findOne({ _id: new ObjectId(id) })

    if (!building) {
      return NextResponse.json(
        { success: false, message: 'Building not found.' },
        { status: 404 }
      )
    }

    return NextResponse.json<IResponse<Building>>(
      {
        success: true,
        message: 'Building fetched successfully.',
        data: building,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'Internal server error.',
      },
      { status: 500 }
    )
  }
}

/**
 * UPDATE: Modify building by ID
 */
export async function UpdateBuilding(
  req: NextRequest,
  { params }: QueryParams
) : Promise<NextResponse<IResponse<Building>>>{
  try {
    const data = await req.json()
    const { id } = await params

    const result = BuildingSchema.safeParse(data)
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.message },
        { status: 400 }
      )
    }

    const update = await buildings.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...result.data } }
    )

    if (update.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'No changes made to building.' },
        { status: 400 }
      )
    }

    return NextResponse.json<IResponse<Building>>(
      {
        success: true,
        message: 'Building updated successfully.',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'Internal server error.',
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE: Remove building by ID
 */
export async function DeleteBuilding(
  req: NextRequest,
  { params }: QueryParams
) : Promise<NextResponse<IResponse>>{
  try {
    const { id } = await params

    const remove = await buildings.deleteOne({ _id: new ObjectId(id) })

    if (remove.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Building not found or already deleted.' },
        { status: 404 }
      )
    }

    return NextResponse.json<IResponse<Building>>(
      {
        success: true,
        message: 'Building deleted successfully.',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'Internal server error.',
      },
      { status: 500 }
    )
  }
}
