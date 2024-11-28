import {
  Calendar,
  Paperclip,
  Inbox,
  Search,
  Settings,
  SquareMenu,
  PlusCircleIcon,
  ThumbsUpIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import LogOutButton from "@/components/logOutButton";

// Menu items.
const items = [
  {
    title: "Tulis Artikel Baru",
    url: "/admin/articles/untitled",
    icon: PlusCircleIcon,
  },
  {
    title: "/admin/articles",
    url: "/admin/articles",
    icon: SquareMenu,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-red-400">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <LogOutButton>Log out</LogOutButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
