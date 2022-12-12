import { defineStore } from "pinia";
import axios from "axios";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notificationId: ""
  }),
  actions: {
    async pushNotification(data: notifData, token: string) {
      axios.post(`https://fcm.googleapis.com/fcm/send`, JSON.stringify({
        "to": token,
        "data": data
      })
      , {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `key=AAAAyfSC-iE:APA91bHnTe2vV-cmvtV7gWQCxi_hFwlVfNjkRtkGR2hfM5zwLm58XNjWzrlx1jsA1V68v8RX7Q14oft2LcVSAGRxkgzx65KysJfnNZ1qTYQ--44nrbUFcAWSAbpmrM_Gmi96_6X7ZSlf`,
        },
      })
    }
  }
});


type notifData = {
  title: string,
    body: string,
    icon: string
}
