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
    title: "대시보드",
    icon: LayoutDashboard,
    url: "/dashboard",
    clickable: false,
  },
  {
    title: "에이보드",
    icon: BarChart3,
    url: "/aboard",
    clickable: false,
  },
  {
    title: "고객 관리",
    icon: UserCircle,
    items: [{ title: "고객 리스트", url: "/customers/list", clickable: false }],
  },
  {
    title: "마케팅",
    icon: Bell,
    items: [
      { title: "마케팅 인원", url: "/marketing/users", clickable: false },
      { title: "마케팅 만들기", url: "/marketing/create", badge: "N", clickable: false },
    ],
  },
  {
    title: "서비스 연동",
    icon: Link2,
    badge: "N",
    url: "/services",
    clickable: false,
  },
  {
    title: "통계",
    icon: BarChart3,
    items: [
      { title: "고객 유입 통계", url: "/stats/inflow", clickable: false },
      { title: "마케팅 통계", url: "/stats/marketing", clickable: false },
    ],
  },
  {
    title: "명의 관리",
    icon: UserCircle,
    url: "/users",
    clickable: false,
  },
  {
    title: "유료서비스",
    icon: CreditCard,
    items: [
      { title: "구독현황", url: "/payment/subscription", clickable: true },
      { title: "서비스 신청", url: "/payment/apply", clickable: true },
      { title: "결제내역", url: "/payment/history", clickable: true },
    ],
  },
  {
    title: "설정",
    icon: Settings,
    items: [
      { title: "회사 정보 관리", url: "/settings/company", clickable: true },
      { title: "나의 계정 정보", url: "/settings/account", clickable: false },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>(["고객 관리", "마케팅", "통계", "유료서비스", "설정"])

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
