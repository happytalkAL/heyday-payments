"use client"

import * as React from "react"
import {
  LayoutDashboard,
  UserCircle,
  Settings,
  ChevronRight,
  CreditCard,
  BarChart3,
  Bell,
  Link2,
  MousePointerClick,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    title: "\uB300\uC2DC\uBCF4\uB4DC",
    icon: LayoutDashboard,
    url: "/dashboard",
    clickable: false,
  },
  {
    title: "\uC5D0\uC774\uBCF4\uB4DC",
    icon: BarChart3,
    url: "/aboard",
    clickable: false,
  },
  {
    title: "\uACE0\uAC1D \uAD00\uB9AC",
    icon: UserCircle,
    items: [{ title: "\uACE0\uAC1D \uB9AC\uC2A4\uD2B8", url: "/customers/list", clickable: false }],
  },
  {
    title: "\uB9C8\uCF00\uD305",
    icon: Bell,
    items: [
      { title: "\uB9C8\uCF00\uD305 \uC778\uC6D0", url: "/marketing/users", clickable: false },
      { title: "\uB9C8\uCF00\uD305 \uB9CC\uB4E4\uAE30", url: "/marketing/create", badge: "N", clickable: false },
    ],
  },
  {
    title: "\uC11C\uBE44\uC2A4 \uC5F0\uB3D9",
    icon: Link2,
    badge: "N",
    url: "/services",
    clickable: false,
  },
  {
    title: "\uD1B5\uACC4",
    icon: BarChart3,
    items: [
      { title: "\uACE0\uAC1D \uC720\uC785 \uD1B5\uACC4", url: "/stats/inflow", clickable: false },
      { title: "\uB9C8\uCF00\uD305 \uD1B5\uACC4", url: "/stats/marketing", clickable: false },
    ],
  },
  {
    title: "\uBA85\uC758 \uAD00\uB9AC",
    icon: UserCircle,
    url: "/users",
    clickable: false,
  },
  {
    title: "\uC720\uB8CC\uC11C\uBE44\uC2A4",
    icon: CreditCard,
    items: [
      { title: "\uAD6C\uB3C5\uD604\uD669", url: "/payment/subscription", clickable: true },
      { title: "\uC11C\uBE44\uC2A4 \uC2E0\uCCAD", url: "/payment/apply", clickable: true },
      { title: "\uACB0\uC81C\uB0B4\uC5ED", url: "/payment/history", clickable: true },
    ],
  },
  {
    title: "\uC124\uC815",
    icon: Settings,
    items: [
      { title: "\uD68C\uC0AC \uC815\uBCF4 \uAD00\uB9AC", url: "/settings/company", clickable: true },
      { title: "\uB098\uC758 \uACC4\uC815 \uC815\uBCF4", url: "/settings/account", clickable: false },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>([
    "\uACE0\uAC1D \uAD00\uB9AC",
    "\uB9C8\uCF00\uD305",
    "\uD1B5\uACC4",
    "\uC720\uB8CC\uC11C\uBE44\uC2A4",
    "\uC124\uC815"
  ])

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold">Hey-there</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible open={openItems.includes(item.title)} onOpenChange={() => toggleItem(item.title)}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight
                            className={`ml-auto h-4 w-4 transition-transform ${
                              openItems.includes(item.title) ? "rotate-90" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.url}>
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                <Link href={subItem.url} className={subItem.clickable ? "font-bold" : ""}>
                                  {subItem.clickable && <MousePointerClick className="h-3 w-3 text-destructive" />}
                                  <span className={subItem.clickable ? "text-destructive" : ""}>{subItem.title}</span>
                                  {subItem.badge && (
                                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url!} className={item.clickable ? "font-bold" : ""}>
                        <item.icon className="h-4 w-4" />
                        <span className={item.clickable ? "text-destructive" : ""}>{item.title}</span>
                        {item.clickable && <MousePointerClick className="ml-auto h-3 w-3 text-destructive" />}
                        {item.badge && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
