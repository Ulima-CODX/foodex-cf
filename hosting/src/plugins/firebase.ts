import Firebase from "firebase/app";

export default Firebase.initializeApp({
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

import "firebase/storage";
export const storage = Firebase.storage();

export const { Timestamp, GeoPoint, FieldValue } = Firebase.firestore;

export type FieldValue = firebase.firestore.FieldValue;
export type Timestamp = firebase.firestore.Timestamp;
export type GeoPoint = firebase.firestore.GeoPoint;

export type FS_Collection = firebase.firestore.CollectionReference;
export type FS_Document = firebase.firestore.DocumentReference;
export type FS_DocumentData = firebase.firestore.DocumentSnapshot;
