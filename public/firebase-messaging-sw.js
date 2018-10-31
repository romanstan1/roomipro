importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '855552313275'
});

const messaging = firebase.messaging();

messaging.onMessage(function(payload) {
  console.log('Message received. ', payload);
  // ...
});

console.log('messaging sw registered')
