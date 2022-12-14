import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuS1urv_ldcP5vmbSoNiIAs5bq6-PBBEU",
  authDomain: "app-auth-17e47.firebaseapp.com",
  databaseURL: "https://app-auth-17e47-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "app-auth-17e47",
  storageBucket: "app-auth-17e47.appspot.com",
  messagingSenderId: "795382363336",
  appId: "1:795382363336:web:2acd474b37d0924b7de1fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);
