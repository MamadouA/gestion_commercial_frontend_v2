import type { AttachmentType } from "../attachment/attachment.types"

export interface CreateProspectionRequest {
    service: string
    deadline: string
    clientId: number
    attachment?: AttachmentType | null
}