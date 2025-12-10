// firebase/gameService.ts
import { db } from './firebase';
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


export interface GameSession {
  id: string;
  joinCode: string;
  status: 'waiting' | 'active' | 'finished';
  createdAt: Date;
}


export async function createNewGame(joinCode: string): Promise<string> {
  try {
    const gamesRef = collection(db, 'games');
    

    const docRef = await addDoc(gamesRef, {
      joinCode: joinCode,
      status: 'waiting', 
      createdAt: serverTimestamp(),
      players: []
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Kunde inte skapa spel:', error);
    throw error;
  }
}


export async function startGame(joinCode: string): Promise<boolean> {
  try {
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, where('joinCode', '==', joinCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      
      await createNewGame(joinCode);
      return true;
    }
    

    const gameDoc = querySnapshot.docs[0];
    const docRef = doc(db, 'games', gameDoc.id);
    
    await updateDoc(docRef, {
      status: 'active',
      startedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error('Kunde inte starta spel:', error);
    return false;
  }
}


export async function stopGame(joinCode: string): Promise<boolean> {
  try {
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, where('joinCode', '==', joinCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return false; 
    }
    
    const gameDoc = querySnapshot.docs[0];
    const docRef = doc(db, 'games', gameDoc.id);
    
    await updateDoc(docRef, {
      status: 'finished',
      endedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error('Kunde inte stoppa spel:', error);
    return false;
  }
}


export async function checkGameStatus(joinCode: string): Promise<'waiting' | 'active' | 'finished' | 'not_found'> {
  try {
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, where('joinCode', '==', joinCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return 'not_found';
    }
    
    const gameData = querySnapshot.docs[0].data();
    return gameData.status || 'waiting';
  } catch (error) {
    console.error('Kunde inte kolla status:', error);
    return 'not_found';
  }
}