import { api } from "../api/api.config";
import type { PaginationType } from "../shared/shared.types";
import type { CreateProspectionRequest } from "./prospection.types";

export const getAllProspections = async (pagination: Omit<PaginationType, "totalCount">) => {
    const response = await api.get('/prospection/all', { params: {currentPage: pagination.currentPage, pageSize: pagination.pageSize } });
    return response.data;
}

export const createProspection = async (prospection: CreateProspectionRequest) => {
    const response = await api.post('/prospection', prospection);
    return response.data;
}