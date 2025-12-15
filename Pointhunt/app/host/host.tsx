// app/host/host.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import TaskCreationModal from '../components/TaskCreationModal';
import { Task } from '../types/Task';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { saveTaskToFirebase, getTasksByJoinCode } from '../firebase/taskService';
import { startGame, stopGame } from '../firebase/gameService';

export default function Host() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  
  const joinCode = params.code ? String(params.code) : 'ABCD';
  
const loadTasks = useCallback(async () => {
  setIsLoading(true);
  try {
    const firebaseTasks = await getTasksByJoinCode(joinCode);
    setTasks(firebaseTasks);
  } catch (_error) {  // _error då den ej används, vill ha kvar ifall man vill ändra det i framtiden.
    Alert.alert('Fel', 'Kunde inte ladda uppgifter från servern');
  } finally {
    setIsLoading(false);
  }
}, [joinCode]);

 const checkGameStatusOnLoad = useCallback(async () => {
  try {
    const session = await getGameSession(joinCode);
    if (session) {
      setGameSession(session);
      setIsGameActive(session.status === 'active');
      setPlayerCount(session.playerCount || 0);
    }
  } catch (error) {
    console.error('Error loading game session:', error);
  }
}, [joinCode]);

useEffect(() => {
  loadTasks();
  checkGameStatusOnLoad();
}, [joinCode, loadTasks, checkGameStatusOnLoad]);
  


  
  const handleSaveTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const taskId = await saveTaskToFirebase(taskData, joinCode);
      
      const newTask: Task = {
        ...taskData,
        id: taskId,
        createdAt: new Date(),
      };
      
      setTasks(prev => [newTask, ...prev]);
      Alert.alert('Klart!', 'Uppgiften är sparad i databasen!');
    } catch (error) {
      Alert.alert('Fel', 'Kunde inte spara uppgiften. Försök igen.');
      console.error(error);
    }
  };

  const handleStartGame = async () => {
    setGameLoading(true);
    
    try {
      const success = await startGame(joinCode);
      
      if (success) {
        setIsGameActive(true);
        Alert.alert('Spel startat', 'Spelet är nu aktivt! Gäster kan ansluta.');
      } else {
        Alert.alert('Fel', 'Kunde inte starta spelet. Kontrollera Firebase.');
      }
    } catch (error) {
      Alert.alert('Fel', 'Ett fel uppstod vid start av spel: ' + error.message);
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
      } else {
        Alert.alert('Fel', 'Kunde inte stoppa spelet');
      }
    } catch (error) {
       console.error('Failed to save task:', error);
      Alert.alert('Fel', 'Ett fel uppstod vid stopp av spel');
    } finally {
      setGameLoading(false);
    }
  };
  
  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(joinCode);
      Alert.alert('Kopierad!', `Koden ${joinCode} har kopierats till urklipp.`);
    } else {
      alert(`Anslutningskod: ${joinCode}\n\nDela denna kod med dina gäster!`);
    }
  };

  const openCreateTaskModal = () => {
    setIsModalVisible(true);
  };

  const closeCreateTaskModal = () => {
    setIsModalVisible(false);
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskSummary}>{item.summary}</Text>
      <View style={styles.taskDetails}>
        <Text style={styles.taskLocation}>{item.location}</Text>
        <Text style={styles.taskPoints}>{item.points} poäng</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Värdens dashboard</Text>
          <Text style={styles.subtitle}>Anslutningskod: {joinCode}</Text>
          
          {/* Game status badge */}
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
          
          {/* Game control buttons */}
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
            <TouchableOpacity onPress={loadTasks} style={styles.refreshButton}>
              <Text style={styles.refreshText}>Uppdatera</Text>
            </TouchableOpacity>
          </View>
          
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#151B7C" />
              <Text style={styles.loadingText}>Laddar uppgifter...</Text>
            </View>
          ) : tasks.length > 0 ? (
            <FlatList
              data={tasks}
              renderItem={renderTaskItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.tasksList}
              showsVerticalScrollIndicator={false}
              refreshing={isLoading}
              onRefresh={loadTasks}
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
    backgroundColor: '#4CAF50',
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
    color: '#151B7C',
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
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#C5E7FF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#151B7C',
  },
  refreshText: {
    color: '#151B7C',
    fontSize: 14,
    fontWeight: 'bold',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#151B7C',
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
    color: '#B89DFF',
    textAlign: 'center',
    lineHeight: 20,
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
    backgroundColor: '#AEDDFF',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  navButtonText: {
    color: '#151B7C',
    fontSize: 12,
    fontWeight: 'bold',
  },
});