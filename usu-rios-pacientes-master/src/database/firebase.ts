import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path"; // Importamos 'path' para resolver o caminho

dotenv.config();

console.log("--- [DEBUG] INICIANDO firebase.ts (v3 - Carregando JSON) ---");
console.log("Projeto ID do .env:", process.env.FIREBASE_PROJECT_ID);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// --- CORREÇÃO APLICADA (Método JSON) ---
// Em vez de ler a chave do .env, vamos ler o arquivo JSON
// que está na raiz do projeto (dentro do container, /src/serviceAccountKey.json)
const serviceAccountPath = path.resolve(__dirname, '../../serviceAccountKey.json');
console.log("--- [DEBUG] Carregando Service Account de:", serviceAccountPath);

admin.initializeApp({
  // Usamos o caminho do arquivo JSON diretamente
  credential: admin.credential.cert(serviceAccountPath),
});
// --- FIM DA CORREÇÃO ---

const authAdmin = admin.auth();

console.log("--- [DEBUG] Firebase Admin inicializado com sucesso! ---");

export { auth, admin, authAdmin };

