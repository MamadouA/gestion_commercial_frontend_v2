import type { RoleType } from "../role/role.types"

export interface UserType {
    id: number
    fullname: string
    email: string
    phone: string
    role: RoleType
}
