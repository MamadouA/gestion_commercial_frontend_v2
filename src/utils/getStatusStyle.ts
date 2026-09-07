
export const getStatusStyle = (status: string) => {
    switch (status) {
        case 'PENDING':
        case 'OPENED':
            return 'bg-blue-300/25 border-blue-500';
        case 'WON':
            return 'bg-green-300/25 border-green-500';
        case 'LOST':
            return 'bg-red-300/25 border-red-500';
        default:
            return 'bg-gray-200/24 text-gray-800';
    }
}