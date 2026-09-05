
export interface ClientFilterType {
    type: "Tous" | "Particulier" | "Entreprise"
    enterpriseName: string
    contactName: string
    email: string
}

export interface ClientRowItemType {
    id: number
    type: "PARTICULIER" | "ENTREPRISE"
    companyName: string
    contactName: string
    email: string
    phone: string
    createdAt: string
}

export interface CreateClientRequest {
    type: "PARTICULIER" | "ENTREPRISE"
    country: string
    address: string
    contactName: string
    phone: string
    email: string
    companyName?: string
    companyLegalForm?: string
    industry?: string
}