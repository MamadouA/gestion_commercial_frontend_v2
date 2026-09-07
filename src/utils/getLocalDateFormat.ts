
export const getLocalDateFormat = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}