import { create } from "zustand"
import type { ProspectionFilterType, ProspectionRowItemType } from "./prospection.types"


type State = {
    prospections: ProspectionRowItemType[]
    filters: ProspectionFilterType
}

type Action = {
    setFilters: (filters: ProspectionFilterType) => void
    setProspections: (prospections: ProspectionRowItemType[]) => void
}

export const useClientStore = create<State & Action>()((set) => ({
    prospections: [],
    filters: { deadline: "", companyName: "", contactName: "", status: "Tout" },
    setFilters: (filters: ProspectionFilterType) => set({ filters }),
    setProspections: (prospections: ProspectionRowItemType[]) => set({ prospections }),
}))