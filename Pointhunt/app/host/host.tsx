// app/host/host.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import TaskCreationModal from '../components/TaskCreationModal';
import { Task } from '../types/Task';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { saveTaskToFirebase, updateTaskInFirebase, deleteTaskFromFirebase } from '../firebase/taskService';
import { startGame, stopGame, checkGameStatus } from '../firebase/gameService';
import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function Host() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Task>>({});
  
  const joinCode = params.code ? String(params.code) : 'ABCD';

  useEffect(() => {
    const q = query(collection(db, 'tasks'), where('joinCode', '==', joinCode), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const taskData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        } as Task));
        setTasks(taskData);
      },
      () => {
        Alert.alert('Fel', 'Kunde inte ladda uppgifter');
        setTasks([]);
      }
    );

    return () => unsubscribe();
  }, [joinCode]);

  useEffect(() => {
    checkGameStatus(joinCode).then(status => {
      setIsGameActive(status === 'active');
    });
  }, [joinCode]);

  const handleSaveTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      await saveTaskToFirebase(taskData, joinCode);
      Alert.alert('Klart!', 'Uppgiften är sparad i databasen!');
    } catch {
      Alert.alert('Fel', 'Kunde inte spara uppgiften');
    }
  };

  const handleUpdateTask = async (taskId: string) => {
    try {
      await updateTaskInFirebase(taskId, editForm);
      setEditingTask(null);
      setEditForm({});
    } catch {
      Alert.alert('Fel', 'Kunde inte uppdatera uppgiften');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    Alert.alert(
      'Ta bort uppgift',
      'Är du säker på att du vill ta bort denna uppgift?',
      [
        { text: 'Avbryt', style: 'cancel' },
        { 
          text: 'Ta bort', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTaskFromFirebase(taskId);
            } catch {
              Alert.alert('Fel', 'Kunde inte ta bort uppgiften');
            }
          }
        },
      ]
    );
  };

  const handleStartGame = async () => {
    setGameLoading(true);
    try {
      const success = await startGame(joinCode);
      if (success) {
        setIsGameActive(true);
        Alert.alert('Spel startat', 'Spelet är nu aktivt!');
      }
    } catch {
      Alert.alert('Fel', 'Kunde inte starta spelet');
    } finally {
      setGameLoading(false);
    }
  };
  
  const handleStopGame = async () => {
    setGameLoading(true);
    try {
      const success = await stopGame(joinCode);
      if (success) {
        setIsGameActive(false);
        Alert.alert('Spel stoppat', 'Spelet är nu avslutat');
      }
    } catch {
      Alert.alert('Fel', 'Kunde inte stoppa spelet');
    } finally {
      setGameLoading(false);
    }
  };
  
  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(joinCode);
      Alert.alert('Kopierad!', `Koden ${joinCode} har kopierats`);
    } else {
      alert(`Anslutningskod: ${joinCode}`);
    }
  };

  const openCreateTaskModal = () => setIsModalVisible(true);
  const closeCreateTaskModal = () => setIsModalVisible(false);

  const startEdit = (task: Task) => {
    setEditingTask(task.id);
    setEditForm({
      title: task.title,
      summary: task.summary,
      location: task.location,
      points: task.points,
    });
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditForm({});
  };

  const renderTaskItem = ({ item }: { item: Task }) => {
    if (editingTask === item.id) {
      return (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editForm.title}
            onChangeText={(text) => setEditForm({...editForm, title: text})}
            placeholder="Titel"
          />
          <TextInput
            style={styles.editInput}
            value={editForm.summary}
            onChangeText={(text) => setEditForm({...editForm, summary: text})}
            placeholder="Beskrivning"
          />
          <TextInput
            style={styles.editInput}
            value={editForm.location}
            onChangeText={(text) => setEditForm({...editForm, location: text})}
            placeholder="Plats"
          />
          <TextInput
            style={styles.editInput}
            value={editForm.points?.toString()}
            onChangeText={(text) => setEditForm({...editForm, points: parseInt(text) || 0})}
            placeholder="Poäng"
            keyboardType="numeric"
          />
          <View style={styles.editButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={() => handleUpdateTask(item.id)}>
              <Text style={styles.buttonText}>Spara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
              <Text style={styles.buttonText}>Avbryt</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.taskItem}
        onPress={() => startEdit(item)}
        onLongPress={() => handleDeleteTask(item.id)}
      >
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskSummary}>{item.summary}</Text>
        <View style={styles.taskDetails}>
          <Text style={styles.taskLocation}>{item.location}</Text>
          <Text style={styles.taskPoints}>{item.points} poäng</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Värdens dashboard</Text>
          <Text style={styles.subtitle}>Anslutningskod: {joinCode}</Text>
          
          <View style={styles.gameStatusContainer}>
            <View style={[
              styles.statusBadge, 
              isGameActive ? styles.statusActive : styles.statusWaiting
            ]}>
              <Text style={styles.statusText}>
                {isGameActive ? ' SPELET KÖR' : ' VÄNTAR'}
              </Text>
            </View>
          </View>
          
          <View style={styles.gameControls}>
            {!isGameActive ? (
              <TouchableOpacity 
                style={[styles.gameButton, styles.startButton]}
                onPress={handleStartGame}
                disabled={gameLoading}
              >
                {gameLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Text style={styles.gameButtonText}> STARTA SPELET</Text>
                    <Text style={styles.gameButtonSubtext}>Låt gäster gå med</Text>
                  </>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.gameButton, styles.stopButton]}
                onPress={handleStopGame}
                disabled={gameLoading}
              >
                {gameLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Text style={styles.gameButtonText}> STOPPA SPELET</Text>
                    <Text style={styles.gameButtonSubtext}>Inga fler kan gå med</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.gameButton, styles.copyButton]}
              onPress={handleCopyCode}
            >
              <Text style={styles.gameButtonText}> KOPIERA KOD</Text>
              <Text style={styles.gameButtonSubtext}>Dela med gäster</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.codeInfo}>
            {isGameActive 
              ? 'Spelet kör! Gäster kan nu ansluta via Guest sidan.'
              : 'Tryck på "Starta spelet" för att låta gäster gå med.'}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.createButton} 
          onPress={openCreateTaskModal}
        >
          <Text style={styles.createButtonText}>+ Skapa ny uppgift</Text>
        </TouchableOpacity>

        <View style={styles.tasksContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Uppgifter ({tasks.length})</Text>
          </View>
          
          {tasks.length > 0 ? (
            <FlatList
              data={tasks}
              renderItem={renderTaskItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.tasksList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Inga uppgifter än</Text>
              <Text style={styles.emptySubtext}>
                Tryck på Skapa ny uppgift för att börja
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navButton, styles.activeNavButton]}
          onPress={() => router.push(`/host/host?code=${joinCode}` as any)}
        >
          <Text style={styles.navButtonText}> Hem</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/tasks?code=${joinCode}` as any)}
        >
          <Text style={styles.navButtonText}> Uppgifter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/settings?code=${joinCode}`)}
        >
          <Text style={styles.navButtonText}> Inställningar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/submissions?code=${joinCode}`)}
        >
          <Text style={styles.navButtonText}> Submissions</Text>
        </TouchableOpacity>
      </View>

      <TaskCreationModal
        visible={isModalVisible}
        onClose={closeCreateTaskModal}
        onSave={handleSaveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEDDFF',
  },
  content: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 60,
  },
  header: {
    padding: 20,
    backgroundColor: '#C5E7FF',
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#151B7C',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#151B7C',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  gameStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusWaiting: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gameControls: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  gameButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  startButton: {
    backgroundColor: '#B89DFF',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  copyButton: {
    backgroundColor: '#2196F3',
  },
  gameButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
  codeInfo: {
    fontSize: 14,
    color: '#151B7C',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
  },
  createButton: {
    backgroundColor: '#FFDE7D',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  createButtonText: {
    color: '#6A4BBC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#151B7C',
  },
  tasksList: {
    gap: 12,
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C5E7FF',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#151B7C',
    marginBottom: 8,
  },
  taskSummary: {
    fontSize: 14,
    color: '#151B7C',
    marginBottom: 12,
    lineHeight: 20,
  },
  taskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskLocation: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  taskPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B89DFF',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#151B7C',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6A4BBC',
    textAlign: 'center',
    lineHeight: 20,
  },
  editContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B89DFF',
    marginBottom: 12,
  },
  editInput: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#C5E7FF',
    borderTopWidth: 2,
    borderTopColor: '#151B7C',
    paddingVertical: 10,
    height: 60,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: '#151B7C',
    fontWeight: 'bold',
  },
  navButtonText: {
    color: '#151B7C',
    fontSize: 14,
    fontWeight: 'bold',
  },
});