import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AdminSidebarItems } from "@/routes/AdminSidebarItems"
import { generateRoutes } from "@/utils/generateRoutes"
import { Outlet } from "react-router"

export default function DashBoardLayout() {
         const res =  generateRoutes(AdminSidebarItems)
         console.log(res);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          
         
        </header>
         <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
