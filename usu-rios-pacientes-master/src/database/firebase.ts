import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
});

const authAdmin = admin.auth();

export { auth, admin, authAdmin };
