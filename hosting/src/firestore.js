import Vue from "vue";
import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);

import firebase from "firebase/app";
import  "firebase/firestore";

export const db = firebase.initializeApp({
    apiKey: "AIzaSyCps14xHhcXnJ49vGL7oOTn6LZZMDZ1lQI",
    authDomain: "foodex-backend.firebaseapp.com",
    databaseURL: "https://foodex-backend.firebaseio.com",
    projectId: "foodex-backend",
    storageBucket: "foodex-backend.appspot.com",
    messagingSenderId: "676398625241",
    appId: "1:676398625241:web:d9a02a4bac557419e269c8"
}).firestore()

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

db.settings({ timestampsInSnapshots: true })