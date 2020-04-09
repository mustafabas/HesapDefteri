import {AsyncStorage} from "react-native";
import axios from 'axios'
import { WATER_INSERT_NOTIFICATION } from "../redux/constants";



export class NotificationService {


    toUserId: number;
    type: number;
    orderId: number;
    tokenList: string[];


    constructor(toUserId: number, type: number, orderId: number, tokenList: string[]) {


        this.toUserId = toUserId;
        this.type = type;
        this.orderId = orderId;
        this.tokenList = tokenList;
    }


    async sendPush(message1 :string , title : string) {
        const serverKey = 'AAAAyE8TtxA:APA91bE8aRkNWapUGBcGjXrWUYk3WMrs2pQPTtLlyZstLeCIaXY8HeLDkQSqaUtQcKfG60pR_TzEEDACSSZFRqUu008rZus474nldtxXK7UDpqfRHj8TKx4wi_pQdVb9sxsHltbqve2S';
        const FIREBASE_API_KEY = serverKey;
        const message = {
            registration_ids: this.tokenList,
            notification: {
                title: title,
                body: message1,
                "vibrate": 1,
                "sound": 1,
                "show_in_foreground": true,
                "priority": "high",
                "content_available": true,
            },
            data: {
                orderId :this.orderId,
                score: 50,
                wicket: 1,
            }
        }

        let headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "key=" + FIREBASE_API_KEY
        });

        fetch("https://fcm.googleapis.com/fcm/send", { method: "POST", headers, body: JSON.stringify(message) })
    }



    addNotification() {



        AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
            let token = res[0][1];
            let userId = res[1][1];

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            axios.post(WATER_INSERT_NOTIFICATION,
                {
                    orderId: this.orderId,
                    userId: this.toUserId,
                    notificationType: this.type,
                    fromUserId: userId

                }, {
                headers: headers
            })
                .then((response) => {
                    if (response.data.isSuccess) {
                        if (response.data.result) {
                            let data = response.data.result;
                            this.sendPush(data.message, data.title);


                        }
                    }
                })
                .catch(error => {

                });

        }).catch(err => {

        })





    }
}