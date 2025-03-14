import dayjs from 'dayjs'
import type { App } from 'vue'

export const formateDate = (timeStamp: number, format: string = 'MM/DD/YY hh:mm a'): string => {
    return dayjs(timeStamp).format(format)
}

export default {
    install(app: App) {
        app.config.globalProperties.$date = formateDate
    }
}
