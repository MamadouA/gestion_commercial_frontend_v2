import type { ReactNode } from "react"

export interface SideNavItem {
    path: string
    Icon: ReactNode
    requiredPermission?: string
}

export interface PaginationType {
    currentPage: number
    pageSize: number
    totalCount: number
}