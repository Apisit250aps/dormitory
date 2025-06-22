'use client'
import { Building2, ChevronsUpDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

import BuildingDialogForm from '../app/building/building-dialog-form'
import { useBuilding } from '@/stores/building'

import { useCallback, useEffect } from 'react'

export default function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const { currentBuilding, buildings, getBuildings, setCurrentBuilding } =
    useBuilding()

  const loadBuildings = useCallback(async () => {
    if (buildings.length) return
    await getBuildings()
  }, [buildings.length, getBuildings])

  useEffect(() => {
    loadBuildings()
  }, [loadBuildings])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Building2 />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {!!currentBuilding ? (
                  <>
                    <span className="truncate font-medium">
                      {currentBuilding!.name}
                    </span>
                    <span className="truncate text-xs">
                      {currentBuilding!.dormitory}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="truncate font-medium">{'Dormitory'}</span>
                    <span className="truncate text-xs">{'management'}</span>
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Buildings
            </DropdownMenuLabel>
            {buildings.map((building, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setCurrentBuilding(building)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Building2 className="size-3.5 shrink-0" />
                </div>
                {building.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <BuildingDialogForm />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
