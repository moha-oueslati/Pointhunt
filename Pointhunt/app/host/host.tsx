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
} from 'react-native';
import TaskCreationModal from '../components/TaskCreationModal';
import { Task } from '../host/tasks';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { saveTaskToFirebase, getTasksByJoinCode } from '../firebase/taskService';
import { startGame, stopGame, checkGameStatus } from '../firebase/gameService';

export default function Host() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  
  const joinCode = params.code ? String(params.code) : 'ABCD';
  
  useEffect(() => {
    loadTasks();
    checkGameStatusOnLoad();
  }, [joinCode]);
  
  const checkGameStatusOnLoad = async () => {
    try {
      const status = await checkGameStatus(joinCode);
      setIsGameActive(status === 'active');
    } catch (error) {
      console.error('Kunde inte kolla spelstatus:', error);
    }
  };
  
  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const firebaseTasks = await getTasksByJoinCode(joinCode);
      setTasks(firebaseTasks);
    } catch (error) {
      Alert.alert('Fel', 'Kunde inte ladda uppgifter från servern');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
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
    setIsLoading(true);
    
    try {
      const success = await startGame(joinCode);
      
      if (success) {
        setIsGameActive(true);
        Alert.alert('Spel startat', 'Spelet är nu aktivt! Gäster kan ansluta.');
      } else {
        Alert.alert('Fel', 'Kunde inte starta spelet');
      }
    } catch (error) {
      Alert.alert('Fel', 'Ett fel uppstod vid start av spel');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStopGame = async () => {
    try {
      const success = await stopGame(joinCode);
      
      if (success) {
        setIsGameActive(false);
        Alert.alert('Spel stoppat', 'Spelet är nu avslutat');
      } else {
        Alert.alert('Fel', 'Kunde inte stoppa spelet');
      }
    } catch (error) {
      Alert.alert('Fel', 'Ett fel uppstod vid stopp av spel');
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
          
          <View style={styles.gameStatusContainer}>
            <View style={[
              styles.statusBadge, 
              isGameActive ? styles.statusActive : styles.statusWaiting
            ]}>
              <Text style={styles.statusText}>
                {isGameActive ? 'SPELET KÖR' : 'VÄNTAR'}
              </Text>
            </View>
          </View>
          
          <View style={styles.gameControls}>
            {!isGameActive ? (
              <TouchableOpacity 
                style={[styles.gameButton, styles.startButton]}
                onPress={handleStartGame}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Text style={styles.gameButtonText}>STARTA SPELET</Text>
                    <Text style={styles.gameButtonSubtext}>Låt gäster gå med</Text>
                  </>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.gameButton, styles.stopButton]}
                onPress={handleStopGame}
              >
                <Text style={styles.gameButtonText}>STOPPA SPELET</Text>
                <Text style={styles.gameButtonSubtext}>Inga fler kan gå med</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.gameButton, styles.copyButton]}
              onPress={handleCopyCode}
            >
              <Text style={styles.gameButtonText}>KOPIERA KOD</Text>
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
              <ActivityIndicator size="large" color="#007AFF" />
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
          style={styles.navButton}
          onPress={() => router.push(`/host/host?code=${joinCode}`)}
        >
          <Text style={styles.navButtonText}>Hem</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/tasks?code=${joinCode}`)}
        >
          <Text style={styles.navButtonText}>Uppgifter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/settings?code=${joinCode}`)}
        >
          <Text style={styles.navButtonText}>Inställningar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/submissions?code=${joinCode}`)}
        >
          <Text style={styles.navButtonText}>Submissions</Text>
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
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 60,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  gameStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusWaiting: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
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
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#666',
    fontStyle: 'italic',
  },
  createButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
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
    color: '#333',
  },
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  refreshText: {
    color: '#007AFF',
    fontSize: 14,
  },
  tasksList: {
    gap: 12,
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  taskSummary: {
    fontSize: 14,
    color: '#666',
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
    color: '#007AFF',
  },
  taskPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9500',
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
    color: '#666',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    height: 60,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});