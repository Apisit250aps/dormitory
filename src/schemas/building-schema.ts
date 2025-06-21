import z from 'zod'

export const BuildingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  step: z.number().int().min(0, 'Step must be a non-negative integer'),
})

export type BuildingTypes = z.infer<typeof BuildingSchema>
