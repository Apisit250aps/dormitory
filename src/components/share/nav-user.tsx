'use client'

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react'

import { Avatar } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import { signOut, useSession } from 'next-auth/react'
import { Skeleton } from '../ui/skeleton'
import Image from 'next/image'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { status, data } = useSession()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {status == 'loading' ? (
                <>
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <Skeleton className="h-3 w-100 rounded-md" />
                    <Skeleton className="h-3 w-100 rounded-md" />
                  </div>
                </>
              ) : (
                <>
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <Image
                      fill
                      src={data!.user!.image! as string}
                      alt={data!.user!.name as string}
                    />
                    {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {data!.user!.name as string}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {data!.user!.email as string}
                    </span>
                  </div>
                </>
              )}
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {status == 'loading' ? (
                  <>
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <Skeleton className="h-3 w-100 rounded-md" />
                      <Skeleton className="h-3 w-100 rounded-md" />
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <Image
                        fill
                        src={data!.user!.image! as string}
                        alt={data!.user!.name as string}
                      />
                      {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {data!.user!.name as string}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {data!.user!.email as string}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
