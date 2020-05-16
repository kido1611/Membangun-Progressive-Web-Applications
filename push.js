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
   "endpoint": "https://fcm.googleapis.com/fcm/send/foO4mUObjSI:APA91bHXS3gCGiyMEAF2sxfNO3Ugt3JzLC5HjeTHDPIesx6DZ7ghnLNrWjKCteMYlElb7Efh4UzI_MfxWGEEIdqx3cEUemzdTQLjm2Aq12bef4eQ-0TwndeBV1SF91aJ3boN416ktFG0",
   "keys": {
       "p256dh": "BI0EgdGZzwHjOOcK4Bbcm2FYVZGJLsq96nxWuEM14cuEARg+AocUevnMjgrEDV/UhyDal7lNIMjIh5gztEZAr1U=",
       "auth": "NRpgQ0lUicpuGOaFA5uSrQ=="
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