import type { AttachmentType } from "../attachment/attachment.types"
import type { PROSPECTIONS_STATUSES } from "./prospection.constants"

export interface CreateProspectionRequest {
    service: string
    deadline: string
    clientId: number
    attachment?: AttachmentType | null
}

export type ProspectionStatusType = keyof typeof PROSPECTIONS_STATUSES;

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
    status: ProspectionStatusType
    createdAt: string
}