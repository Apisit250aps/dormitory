import z from 'zod'

export const BuildingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dormitory: z.string().min(1, 'Type is required'),
  floor: z.number().int().min(0, 'Step must be a non-negative integer'),
})

export type BuildingValues = z.infer<typeof BuildingSchema>
