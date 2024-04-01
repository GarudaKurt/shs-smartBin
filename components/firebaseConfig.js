import { initializeApp } from "firebase/app";
import { getDatabase } from '@firebase/database'; // Import getDatabase from firebase/database

const firebaseConfig = {
    databaseURL: "https://smarttrashbin-e28c0-default-rtdb.firebaseio.com/"
}
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Realtime Database
export const firebaseDatabase = getDatabase(firebaseApp);