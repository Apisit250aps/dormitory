import { StatusBadge } from '@/components/share/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Building } from '@/schemas/building-schema'
import { useBuilding } from '@/stores/building'
import { IconDotsVertical } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { toast } from 'sonner'
import { ConfirmDeleteDialog } from '@/components/share/confirm-delete-dialog'
interface BuildingActionsCellProps {
  row: { original: { uuid: string; name: string } } // ปรับ type ตามจริง
}

const BuildingActionsCell: React.FC<BuildingActionsCellProps> = ({ row }) => {
  const { deleteBuilding, error, loading } = useBuilding()
  const onConfirmDelete = async (): Promise<boolean> => {
    await deleteBuilding(row.original.uuid)
    if (error == null) {
      toast.success('Delete building success!')
      return true
    }
    toast.error(error)
    return false
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
        >
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/building/${row.original.uuid}`}>Edit</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        <ConfirmDeleteDialog loading={loading} onConfirm={() => onConfirmDelete()}>
          <DropdownMenuItem
          
            onSelect={(e) => {
              e.preventDefault()
            }}
          >
            Delete
          </DropdownMenuItem>
        </ConfirmDeleteDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const buildingColumn: ColumnDef<Building>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'dormitory',
    header: 'Dormitory',
  },
  {
    accessorKey: 'floor',
    header: 'Floor',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.status!}
        falseText={'inactive'}
        trueText={'active'}
      />
    ),
  },
  {
    header: 'Actions',
    cell: ({ row }) => <BuildingActionsCell row={row} />,
  },
]
