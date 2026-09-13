import type { AttachmentType } from "../attachment/attachment.types"

export interface CreateLeadRequest {
    service: string
    deadline: string
    clientId: number
    type: "PROSPECTION" | "OFFER"
    attachment?: AttachmentType | null
}