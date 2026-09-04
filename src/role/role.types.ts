export interface RoleType {
    id: number
    name: string
    description: string
    permissions: PermissionType[]
}

export interface PermissionType {
    id: number
    name: string
    description: string
    feature: string
}