import { create } from "zustand"
import type { ClientFilterType, ClientRowItemType } from "./client.types"

type State = {
    clients: ClientRowItemType[]
    filters: ClientFilterType
}

type Action = {
    setFilters: (filters: ClientFilterType) => void
    setClients: (clients: ClientRowItemType[]) => void
}

export const useClientStore = create<State & Action>()((set) => ({
    isClientFormOpen: false,
    clients: [],
    filters: { type: "Tous", enterpriseName: "", contactName: "", email: "" },
    setFilters: (filters: ClientFilterType) => set({ filters }),
    setClients: (clients: ClientRowItemType[]) => set({ clients }),
}))