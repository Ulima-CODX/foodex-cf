import Vue from "vue";
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);

import Firebase from "firebase/app";
Firebase.initializeApp({
  apiKey: "AIzaSyCps14xHhcXnJ49vGL7oOTn6LZZMDZ1lQI",
  authDomain: "foodex-backend.firebaseapp.com",
  databaseURL: "https://foodex-backend.firebaseio.com",
  projectId: "foodex-backend",
  storageBucket: "foodex-backend.appspot.com",
  messagingSenderId: "676398625241",
  appId: "1:676398625241:web:d9a02a4bac557419e269c8"
});

import "firebase/auth";
export const auth = Firebase.auth();

import "firebase/firestore";
export const db = Firebase.firestore();

const { TimeStamp, GeoPoint, FieldValue } = Firebase.firestore;
export { TimeStamp, GeoPoint, FieldValue };
