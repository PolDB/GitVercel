// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsK3RfwLu_n9ZnXuHEcNZSDdNByD1i5Ec",
  authDomain: "todo-auth-sandbox-a6e4e.firebaseapp.com",
  projectId: "todo-auth-sandbox-a6e4e",
  storageBucket: "todo-auth-sandbox-a6e4e.firebasestorage.app",
  messagingSenderId: "318286936748",
  appId: "1:318286936748:web:a1a08884814d92bafabd09",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
