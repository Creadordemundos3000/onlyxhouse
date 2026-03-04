import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  increment
} from "firebase/firestore";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";

// Helper to check initialization
const checkFirebase = () => {
  if (!db || !storage) {
    throw new Error("Firebase services are not initialized. Check your configuration.");
  }
  return { db, storage };
};

export interface ModelRate {
  duration: string;
  price: string;
}

export interface Model {
  id?: string;
  name: string;
  age: string;
  phone: string;
  category: string;
  location: string;
  description: string;
  services: string;
  rates: ModelRate[];
  photos: string[];
  status: "active" | "pending" | "inactive";
  views: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const COLLECTION_NAME = "models";

export const modelService = {
  // Create
  create: async (model: Omit<Model, "id" | "views" | "createdAt" | "updatedAt">, photoFiles: File[]) => {
    const { db, storage } = checkFirebase();
    try {
      // 1. Upload photos first
      const photoUrls = await Promise.all(
        photoFiles.map(async (file) => {
          const storageRef = ref(storage, `models/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );

      // 2. Add document to Firestore
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...model,
        photos: photoUrls,
        views: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return { id: docRef.id, ...model, photos: photoUrls };
    } catch (error) {
      console.error("Error creating model:", error);
      throw error;
    }
  },

  // Read All
  getAll: async () => {
    const { db } = checkFirebase();
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Model[];
    } catch (error) {
      console.error("Error fetching models:", error);
      throw error;
    }
  },

  // Subscribe to updates (Real-time)
  subscribe: (callback: (models: Model[]) => void) => {
    if (!db) return () => {}; // Safe return for uninitialized db
    
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const models = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Model[];
      callback(models);
    });
  },

  // Read One
  getById: async (id: string) => {
    const { db } = checkFirebase();
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Model;
      }
      return null;
    } catch (error) {
      console.error("Error fetching model:", error);
      throw error;
    }
  },

  // Update
  update: async (id: string, data: Partial<Model>, newPhotoFiles: File[] = []) => {
    const { db, storage } = checkFirebase();
    try {
      let photoUrls: string[] = data.photos || [];

      // Upload new photos if any
      if (newPhotoFiles.length > 0) {
        const newUrls = await Promise.all(
          newPhotoFiles.map(async (file) => {
            const storageRef = ref(storage, `models/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
          })
        );
        photoUrls = [...photoUrls, ...newUrls];
      }

      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        photos: photoUrls,
        updatedAt: serverTimestamp(),
      });
      
      return { id, ...data, photos: photoUrls };
    } catch (error) {
      console.error("Error updating model:", error);
      throw error;
    }
  },

  // Delete
  delete: async (id: string) => {
    const { db } = checkFirebase();
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error("Error deleting model:", error);
      throw error;
    }
  },

  // Increment Views
  incrementViews: async (id: string) => {
    if (!db) return;
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        views: increment(1)
      });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  }
};
