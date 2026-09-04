
export interface ClientFilterType {
    type: "Tous" | "Particulier" | "Entreprise"
    enterpriseName: string
    contactName: string
    email: string
}

export interface ClientRowItemType {
    id: number
    type: "PARTICULIER" | "ENTREPRISE"
    enterpriseName: string
    contactName: string
    email: string
    phone: string
    createdAt: string
}