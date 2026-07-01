import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { toFriendlyError } from "@/firebase/errors";

/** Documento crudo de Firestore con su id. */
export type DocRecord = { id: string } & Record<string, unknown>;

function requireDb() {
  if (!db) throw new Error("Firestore no está disponible.");
  return db;
}

/**
 * Repositorio genérico (patrón Repository): CRUD + suscripción en tiempo real
 * para CUALQUIER colección. Centraliza el acceso a datos y el manejo de errores.
 */
export const firestoreRepository = {
  /** Suscripción en tiempo real a todos los documentos de una colección. */
  subscribe(
    collectionName: string,
    onData: (docs: DocRecord[]) => void,
    onError: (error: unknown) => void,
    orderField?: string,
  ): Unsubscribe {
    if (!db) {
      onData([]);
      return () => {};
    }
    const base = collection(db, collectionName);
    const q = orderField ? query(base, orderBy(orderField, "asc")) : base;
    return onSnapshot(
      q,
      (snap) =>
        onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as DocRecord)),
      onError,
    );
  },

  /** Crea un documento (id autogenerado) o con id fijo si se especifica. */
  async create(
    collectionName: string,
    data: Record<string, unknown>,
    id?: string,
  ): Promise<string> {
    const database = requireDb();
    try {
      const payload = { ...data, createdAt: serverTimestamp() };
      if (id) {
        await setDoc(doc(database, collectionName, id), payload);
        return id;
      }
      const ref = await addDoc(collection(database, collectionName), payload);
      return ref.id;
    } catch (err) {
      throw new Error(toFriendlyError(err, "No se pudo crear el documento."));
    }
  },

  /** Actualiza campos de un documento existente. */
  async update(
    collectionName: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    const database = requireDb();
    try {
      await updateDoc(doc(database, collectionName, id), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      throw new Error(
        toFriendlyError(err, "No se pudo actualizar el documento."),
      );
    }
  },

  /** Crea o reemplaza por completo un documento con id fijo (upsert). */
  async upsert(
    collectionName: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    const database = requireDb();
    try {
      await setDoc(
        doc(database, collectionName, id),
        { ...data, updatedAt: serverTimestamp() },
        { merge: true },
      );
    } catch (err) {
      throw new Error(toFriendlyError(err, "No se pudo guardar el documento."));
    }
  },

  /** Elimina un documento. */
  async remove(collectionName: string, id: string): Promise<void> {
    const database = requireDb();
    try {
      await deleteDoc(doc(database, collectionName, id));
    } catch (err) {
      throw new Error(
        toFriendlyError(err, "No se pudo eliminar el documento."),
      );
    }
  },
};
