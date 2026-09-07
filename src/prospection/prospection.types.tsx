import type { AttachmentType } from "../attachment/attachment.types"
import type { PROSPECTIONS_STATUSES } from "./prospection.constants"

export interface CreateProspectionRequest {
    service: string
    deadline: string
    clientId: number
    attachment?: AttachmentType | null
}

// -
export interface ProspectionRowItemType {
    id: number
    service: string
    deadline: string
    client: {
        id: number
        type: "PARTICULIER" | "ENTREPRISE"
        companyName: string
        contactName: string
    },
    author: {
        id: number
        fullname: string
    }
    status: typeof PROSPECTIONS_STATUSES[number]
    createdAt: string
}