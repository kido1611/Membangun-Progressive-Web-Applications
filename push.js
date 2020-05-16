var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BB30YHl7b_4Lwe_5VSdZH-uWzeR-V6R1xtQjYmykaDp3iqOcfBJIlWDSJqhlOFszejoHq4vwofIVvHFP0SxmLGQ",
   "privateKey": "OgAiQ-ENhMb5OFyNoewj-UiFLb8dfLq0Y2KqW9i1OiA"
};
 
 
webPush.setVapidDetails(
   'mailto:ahmadci3@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/efSWllC0VYQ:APA91bHOZQXfaDiKb2FoLWPSHejGHTlRvi9Q-EGYwS8CegUnPZ8a33Bl9jt2_q1BVjHdfY5AeRdMuqGfl_9W-_Uu6pIcM-Q_pYOvKQpR_pSG4O8MsneFiac298-57cPrd9WbFnpVBOnJ",
   "keys": {
       "p256dh": "BOW8n+0t1bQ8usWE+jJ31uHdKgzwZOTm0kCE9HQcziZPykmVRWP23/T6b856ANCntLsGbCX3GQlmgnuy8xrrpHg=",
       "auth": "0ByRIkx8NEB0Fs4d7uu7rg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1041193457897',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);