import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDr3xojz9tDhStodDOCstxQ3n7stDyQJFQ",
  authDomain: "greeting-app-98fee.firebaseapp.com",
  projectId: "greeting-app-98fee",
  storageBucket: "greeting-app-98fee.appspot.com",
  messagingSenderId: "775024434679",
  appId: "1:775024434679:web:38f9f4d7a3a83eb93762f2",
  measurementId: "G-1NWF54FEEF"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
