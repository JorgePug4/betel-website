import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

/**
 * Configuración de Firebase tomada de variables de entorno (prefijo GATSBY_
 * para que estén disponibles en el cliente). Nunca se hardcodean credenciales.
 */
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
};
/**
 * Indica si Firebase tiene credenciales. Permite que la app degrade con
 * elegancia (sin romper el build ni el render) mientras no se configuran.
 */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);

let app: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  // En el navegador: caché persistente en IndexedDB (multi-pestaña).
  // Con onSnapshot, las lecturas se sirven primero desde esta caché local
  // (0 lecturas de cuota) y luego se sincronizan con el servidor en tiempo real.
  // En SSR/build (sin IndexedDB) se usa la instancia en memoria.
  if (typeof window !== "undefined") {
    try {
      dbInstance = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      });
    } catch {
      // Ya inicializado o IndexedDB no disponible (ej. modo privado).
      dbInstance = getFirestore(app);
    }
  } else {
    dbInstance = getFirestore(app);
  }

  storageInstance = getStorage(app);
}

export const db = dbInstance;
export const storage = storageInstance;
export { app };
