import {
  BuildingFormSchema,
  type BuildingForm,
} from '@/schemas/building-schema'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { FormDataProps } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'

export default function BuildingForm({
  defaultValues,
  onSubmit,
}: FormDataProps<BuildingForm>) {
  const form = useForm<BuildingForm>({
    resolver: zodResolver(BuildingFormSchema),
    defaultValues: defaultValues || {
      name: '',
      dormitory: 'male',
      floor: 1,
      status: true,
    },
  })

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues)
    }
  }, [defaultValues, form])

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-6 w-full max-w-4xl mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dormitory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dormitory</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value.toString()}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['male', 'female', 'mixed'].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.toLocaleUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Enter floor"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  )
}
