import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getStorage, FirebaseStorage } from "firebase/storage";

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
};

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyCFcefM9t0rGnXeDUlOGeId0m_J7EuKRaE",
  authDomain: "facebook-clone-9f800.firebaseapp.com",
  projectId: "facebook-clone-9f800",
  storageBucket: "facebook-clone-9f800.appspot.com",
  messagingSenderId: "1046394405288",
  appId: "1:1046394405288:web:1fded6e8f6594fe8329d9d",
  measurementId: "G-5ZH1PQ7MF7",
};

let firebaseApp: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let storage: FirebaseStorage | null = null;

export const getFirebaseInstance = (): FirebaseApp => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
  }
  return firebaseApp;
};

export const getAnalyticsInstance = (): Analytics => {
  if (!analytics) {
    const app = getFirebaseInstance();
    analytics = getAnalytics(app);
  }
  return analytics;
};

export const getStorageInstance = (): FirebaseStorage => {
  if (!storage) {
    const app = getFirebaseInstance();
    storage = getStorage(app);
  }
  return storage;
};
