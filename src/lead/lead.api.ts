import { api } from "../api/api.config";
import type { CreateLeadRequest } from "./lead.types";

// -
export const getAllLeads = async () => {
    const result = await api.get("/lead/all");
    return result.data;
}

// -
export const createLead = async (lead: CreateLeadRequest) => {
    const result = await api.post("/lead/create", lead);
    return result.data;
}