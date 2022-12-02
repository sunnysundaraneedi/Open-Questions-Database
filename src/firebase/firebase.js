import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUZ9P5-EeKLEnbN5NpoMNkVAFcBe5_r90",
  authDomain: "open-db-41043.firebaseapp.com",
  projectId: "open-db-41043",
  storageBucket: "open-db-41043.appspot.com",
  messagingSenderId: "121212572891",
  appId: "1:121212572891:web:0d38faeca1a27c40eb68fe",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
