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
import { Task } from '../types/Task';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { saveTaskToFirebase, getTasksByJoinCode } from '../firebase/taskService';

export default function Host() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  

  const joinCode = params.code ? String(params.code) : 'ABCD';
  

  useEffect(() => {
    loadTasks();
  }, [joinCode]);
  
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
      {/* huvudinnehåll */}
      <View style={styles.content}>
        {/* rubrik */}
        <View style={styles.header}>
          <Text style={styles.title}>Värdens/hostens dashboard</Text>
          <Text style={styles.subtitle}>Anslutningskod: {joinCode}</Text>
          <Text style={styles.codeInfo}>Dela denna kod med dina gäster!</Text>
        </View>

        {/* knapp för att skapa uppgift */}
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={openCreateTaskModal}
        >
          <Text style={styles.createButtonText}>+ Skapa ny uppgift</Text>
        </TouchableOpacity>

        {/* lista med uppgifter */}
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

      {/* navigation bar i botten */}
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
      </View>

      {/* popup-fönster för att skapa uppgifter */}
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