import React, { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDeleteDialogProps {
  children: React.ReactNode
  title?: string
  description?: string
  onConfirm: () => Promise<boolean> | boolean
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export function ConfirmDeleteDialog({
  children,
  title = 'Delete Item',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
  onConfirm,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false,
}: ConfirmDeleteDialogProps) {
  const [open, setOpen] = useState(false)
  const [internalLoading, setInternalLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setInternalLoading(true)
      const result = await onConfirm()
      if (result) {
        setOpen(false) // ปิด dialog หลัง confirm สำเร็จ
      }
    } finally {
      setInternalLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={internalLoading}>
              {cancelText}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={internalLoading || loading}
          >
            {internalLoading || loading ? 'Deleting...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
