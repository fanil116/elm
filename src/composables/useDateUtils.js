export function useDateUtils() {
    // Функция форматирования даты
    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    // Функция получения даты с учетом смещения
    const getDateWithOffset = (offsetDays = 0) => {
        const date = new Date()
        date.setDate(date.getDate() + offsetDays)
        return formatDate(date)
    }

    return {
        formatDate,
        getDateWithOffset
    }
}