// firebase/taskService.ts
import { db } from '../firebase/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { Task } from '../types/Task';

// spara task till firebase
export async function saveTaskToFirebase(
  taskData: Omit<Task, 'id' | 'createdAt'>,
  joinCode: string
): Promise<string> {
  try {
    const tasksRef = collection(db, 'tasks');
    const docRef = await addDoc(tasksRef, {
      ...taskData,
      joinCode: joinCode,
      createdAt: serverTimestamp(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving task to Firebase:', error);
    throw error;
  }
}

// hämtar tasks beroende på id
export async function getTasksByJoinCode(joinCode: string): Promise<Task[]> {
  try {
    const tasksRef = collection(db, 'tasks');
    const q = query(
      tasksRef, 
      where('joinCode', '==', joinCode),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tasks.push({
        id: doc.id,
        title: data.title,
        summary: data.summary,
        location: data.location,
        points: data.points,
        createdAt: data.createdAt?.toDate() || new Date(),
      });
    });
    
    return tasks;
  } catch (error) {
    console.error('Error getting tasks from Firebase:', error);
    throw error;
  }
}

// hämtar alla tasks
export async function getAllTasks(): Promise<Task[]> {
  try {
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tasks.push({
        id: doc.id,
        title: data.title,
        summary: data.summary,
        location: data.location,
        points: data.points,
        createdAt: data.createdAt?.toDate() || new Date(),
      });
    });
    
    return tasks;
  } catch (error) {
    console.error('Error getting all tasks from Firebase:', error);
    throw error;
  }
}

export async function updateTaskInFirebase(taskId: string, updates: Partial<Task>): Promise<void> {
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTaskFromFirebase(taskId: string): Promise<void> {
  const taskRef = doc(db, 'tasks', taskId);
  await deleteDoc(taskRef);
}