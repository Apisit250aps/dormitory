import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import React from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import {
  BuildingFormSchema,
  BuildingFormValues,
} from '@/schemas/building-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBuilding } from '@/stores/building'
import { toast } from 'sonner'

export default function BuildingDialogForm() {
  const form = useForm<BuildingFormValues>({
    resolver: zodResolver(BuildingFormSchema),
    defaultValues: {
      name: '',
      dormitory: 'male',
      floor: 1,
    },
  })

  const { clearError, createBuilding, error } = useBuilding()

  const onSubmit = async (data: BuildingFormValues) => {
    try {
      await createBuilding(data)
      if (error == null) {
        toast.success('Building created successfully!')
        // Reset form หรือ redirect
        form.reset()
        return
      } else {
        toast.error(error || 'Failed to create building')
        clearError()
      }
    } catch (error) {
      console.error(error)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="gap-2 p-2 cursor-pointer flex items-center">
          <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
            <Plus className="size-4" />
          </div>
          <div className="text-muted-foreground font-medium">Add building</div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Building</DialogTitle>
              <DialogDescription>create new buildings</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
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
                        placeholder="Enter floor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
