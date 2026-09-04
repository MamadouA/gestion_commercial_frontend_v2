import { api } from "../api/api.config";
import type { SignInType } from "./auth.types";


export const authenticate = async (user: SignInType) => {
    const result = await api.post("/auth/login", user);
    return result.data;
}