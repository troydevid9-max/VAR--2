/* ========================
   FIREBASE.JS
   VAR Accessories — Firebase Realtime Database
   Config from: firebase.google.com → Project Settings
======================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCo8pwzDn17sZS7mn439IlWRpqetffVZBA",
  authDomain: "var-accessories.firebaseapp.com",
  databaseURL: "https://var-accessories-default-rtdb.firebaseio.com",
  projectId: "var-accessories",
  storageBucket: "var-accessories.firebasestorage.app",
  messagingSenderId: "568657656860",
  appId: "1:568657656860:web:50c0ef38da327e77a0f3d9",
  measurementId: "G-J21YK8C7RN"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

export { db, ref, set, get, child };
