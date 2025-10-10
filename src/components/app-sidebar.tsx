import { Calendar, Home, PlusCircleIcon, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
// import LogoutCompo from "./shared/LogoutCompo";
import Link from "next/link";
import { SearchForm } from "./search-form";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Create Blog",
    url: "/dashboard/create-blog",
    icon: PlusCircleIcon,
  },
  {
    title: "Create Project",
    url: "/dashboard/create-project",
    icon: PlusCircleIcon,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
          <SidebarHeader className="">

        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent className="flex flex-col  min-h-screen justify-between py-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <hr />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
{/* <LogoutCompo/> */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}