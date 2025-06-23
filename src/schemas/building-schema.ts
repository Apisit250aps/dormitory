import z from 'zod'
import { v4 as uuidv4 } from 'uuid'

export const BuildingSchema = z.object({
  uuid: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string().min(1, 'Name is required'),
  dormitory: z.string().min(1, 'Type is required'),
  floor: z.number().int().min(0, 'Step must be a non-negative integer'),
  status: z.boolean().default(true).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
})

export const BuildingUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  dormitory: z.string().min(1, 'Type is required').optional(),
  floor: z
    .number()
    .int()
    .min(0, 'Step must be a non-negative integer')
    .optional(),
  status: z.boolean().default(true).optional(),
  updatedAt: z.date().default(() => new Date()),
})

export const BuildingFormSchema = BuildingSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
})

export type BuildingFormValues = z.infer<typeof BuildingFormSchema>
export type Building = z.infer<typeof BuildingSchema>
