import dayjs from "dayjs";
import type { App } from "vue";

export const formateDate =  (timeStamp: number): string => {
   return dayjs(timeStamp).format("MM/DD/YY hh:mm a");
 };

export default {
  install (app:App){
    app.config.globalProperties.$date = formateDate;
  }
}

