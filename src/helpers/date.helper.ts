export const formatDate = (date: string): string => {
    const newDate = new Date(date)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    } as const

    return newDate.toLocaleDateString('es-ES', options)
}