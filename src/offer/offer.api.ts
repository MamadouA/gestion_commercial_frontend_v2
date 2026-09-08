import { api } from "../api/api.config";
import type { PaginationType } from "../shared/shared.types";
import type { OfferFilterType } from "./offer.types";

// -
export const getAllOffers = async (pagination: Omit<PaginationType, "totalCount">, filter: OfferFilterType) => {
    const result = await api.get("/offer/all", { params: { currentPage: pagination.currentPage, pageSize: pagination.pageSize }});
    return result.data;
}