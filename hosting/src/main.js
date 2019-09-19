import * as firebase from 'firebase';
import 'firebase/firestore'
firebase.initializeApp({
  apiKey: "AIzaSyCps14xHhcXnJ49vGL7oOTn6LZZMDZ1lQI",
  authDomain: "foodex-backend.firebaseapp.com",
  databaseURL: "https://foodex-backend.firebaseio.com",
  projectId: "foodex-backend",
  storageBucket: "foodex-backend.appspot.com",
  messagingSenderId: "676398625241",
  appId: "1:676398625241:web:d9a02a4bac557419e269c8"
});

import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
