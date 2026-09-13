import type { AttachmentType } from "../attachment/attachment.types"
import type { LEAD_STATUSES } from "./lead.constants"

export interface CreateLeadRequest {
    service: string
    deadline: string
    clientId: number
    type: "PROSPECTION" | "OFFER"
    attachment?: AttachmentType | null
}

// -
export interface LeadRowItemType {
    id: number
    type: "PROSPECTION" | "OFFER"
    client: {
        id: number
        type: "PARTICULIER" | "ENTREPRISE"
        companyName: string
        contactName: string
    }
    service: string
    amountHT: number
    deadline: string
    status: LeadStatusType
    createdAt: string
}

export type LeadStatusType = keyof typeof LEAD_STATUSES;