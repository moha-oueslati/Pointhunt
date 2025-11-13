import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import TaskCreationModal from './components/TaskCreationModal';
import { Task } from './types/Task';

export default function Host() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  // hantera när man sparar en ny task
  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(), // skapa ett enkelt id
      createdAt: new Date(),
    };

    setTasks(prev => [newTask, ...prev]);
    Alert.alert('Klart!', 'Uppgiften är skapad!');
  };

  // öppna popup fönstret för att skapa task
  const openCreateTaskModal = () => {
    setIsModalVisible(true);
  };

  // stäng popup fönstret
  const closeCreateTaskModal = () => {
    setIsModalVisible(false);
  };

  // visa en task i listan
  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskSummary}>{item.summary}</Text>
      <View style={styles.taskDetails}>
        <Text style={styles.taskLocation}>📍 {item.location}</Text>
        <Text style={styles.taskPoints}>{item.points} poäng</Text>
      </View>
      <Text style={styles.taskDate}>
        Skapad: {item.createdAt.toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* rubrik delen */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Host Dashboard</Text>
        <Text style={styles.headerSubtitle}>
          Skapa och hantera uppgifter för din pointhunt
        </Text>
        
        {/* knapp för att skapa tasks */}
        <TouchableOpacity 
          style={styles.createTaskButton} 
          onPress={openCreateTaskModal}
        >
          <Text style={styles.createTaskButtonText}>+ Skapa ny task</Text>
        </TouchableOpacity>
      </View>

      {/* lista med tasks */}
      <View style={styles.tasksSection}>
        <Text style={styles.sectionTitle}>
          Skapade tasks ({tasks.length})
        </Text>
        
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
            <Text style={styles.emptyStateTitle}>Inga Tasks än</Text>
            <Text style={styles.emptyStateText}>
              Tryck på Skapa ny task för att lägga till din första task!
            </Text>
          </View>
        )}
      </View>

      {/* popup-fönster för att skapa tasks */}
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
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  createTaskButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createTaskButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  tasksSection: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  tasksList: {
    gap: 12,
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
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
    marginBottom: 8,
  },
  taskLocation: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  taskPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9500',
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
});