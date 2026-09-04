import { api } from "../api/api.config"
import type { PaginationType } from "../shared/shared.types";

export const getAllClients = async (pagination: Omit<PaginationType, "totalCount">) => {
    const response = await api.get('/client/all', { params: {currentPage: pagination.currentPage, pageSize: pagination.pageSize } });
    return response.data;
}