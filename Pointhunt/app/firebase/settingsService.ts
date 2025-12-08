// firebase/settingsService.ts
import { db } from '../firebase/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc,
  doc,
  serverTimestamp 
} from 'firebase/firestore';

export interface HuntSettings {
  huntName: string;
  hostName: string;
  joinCode: string;
  createdAt: Date;
  updatedAt: Date;
}

// Spara inställningar för en session
export async function saveHuntSettings(
  joinCode: string,
  settings: { huntName: string; hostName: string }
): Promise<string> {
  try {
    const settingsRef = collection(db, 'huntSettings');
    
    // Kollar om det redan finns inställningar för denna joinCode
    const q = query(settingsRef, where('joinCode', '==', joinCode));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Uppdatera inställningar
      const docRef = doc(db, 'huntSettings', querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        ...settings,
        updatedAt: serverTimestamp(),
      });
      return querySnapshot.docs[0].id;
    } else {
      // Skapa nya inställningar
      const docRef = await addDoc(settingsRef, {
        ...settings,
        joinCode: joinCode,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    }
  } catch (error) {
    console.error('Error saving hunt settings to Firebase:', error);
    throw error;
  }
}

// Hämta inställningar för en session
export async function getHuntSettings(joinCode: string): Promise<HuntSettings | null> {
  try {
    const settingsRef = collection(db, 'huntSettings');
    const q = query(settingsRef, where('joinCode', '==', joinCode));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      return {
        huntName: data.huntName,
        hostName: data.hostName,
        joinCode: data.joinCode,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting hunt settings from Firebase:', error);
    throw error;
  }
}