import type { OFFER_STATUSES } from "./offer.constants"

// -
export type OfferStatusType = keyof typeof OFFER_STATUSES;

// -
export interface OfferRowItemType {
    id: number
    title: string
    deadline: string
    status: OfferStatusType
    client: {
        id: number
        type: "PARTICULIER" | "ENTREPRISE"
        companyName: string
        contactName: string
    },
    author: {
        id: number
        fullname: string  
    },
    createdAt: string
}

// -
export interface OfferFilterType {

}