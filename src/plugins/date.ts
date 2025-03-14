import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import type { App } from 'vue'

dayjs.extend(isToday)
dayjs.extend(isYesterday)

export const formateDate = (timeStamp: number, format: string = 'MM/DD/YY hh:mm a'): string => {
    return dayjs(timeStamp).format(format)
}

export const formatFromToday = (timeStamp: number) => {
    const day = dayjs(timeStamp)
    const formated = day.isToday() ? 'Today' : day.isYesterday() ? 'Yesterday' : day.format('dddd, MMMM D')

    return `${formated} ${day.format('hh:mm a')}`
}

export default {
    install(app: App) {
        app.config.globalProperties.$date = formateDate
    }
}
