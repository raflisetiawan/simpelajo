importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBBSIxGMc9TSA7GjPntEKL6w_LMXrOpk18",
  authDomain: "simpelajo.firebaseapp.com",
  projectId: "simpelajo",
  storageBucket: "simpelajo.appspot.com",
  messagingSenderId: "867390650913",
  appId: "1:867390650913:web:52d858f4557dd2d1fb4160",
  measurementId: "G-157MFY4L99",
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    // icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
