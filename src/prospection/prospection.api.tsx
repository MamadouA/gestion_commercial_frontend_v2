import { api } from "../api/api.config";
import type { CreateProspectionRequest } from "./prospection.types";

export const createProspection = async (prospection: CreateProspectionRequest) => {
    const response = await api.post('/prospections', prospection);
    return response.data;
}