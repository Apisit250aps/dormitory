import z from 'zod'

export const BuildingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dormitory: z.string().min(1, 'Type is required'),
  floor: z.number().int().min(0, 'Step must be a non-negative integer'),
  createdAt: z.preprocess(
    (arg) =>
      typeof arg === 'string' || typeof arg === 'number' || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date().default(() => new Date())
  ),
  updatedAt: z.date().default(() => new Date()),
})

export const BuildingFormSchema = BuildingSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export type BuildingFormValues = z.infer<typeof BuildingFormSchema>
export type BuildingValues = z.infer<typeof BuildingSchema>
