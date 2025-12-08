// app/host/tasks.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getAllTasks, getTasksByJoinCode } from '../firebase/taskService';
import { Task } from '../../types/Task';

export default function AllTasks() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const joinCode = params.code ? String(params.code) : 'ABCD';
  const [viewMode, setViewMode] = useState<'all' | 'session'>('session');
  
  useEffect(() => {
    if (viewMode === 'all') {
      loadAllTasks();
    } else {
      loadSessionTasks();
    }
  }, [viewMode, joinCode]);
  
  const loadAllTasks = async () => {
    setIsLoading(true);
    try {
      const allTasks = await getAllTasks();
      setTasks(allTasks);
    } catch (error) {
      console.error('Error loading all tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadSessionTasks = async () => {
    setIsLoading(true);
    try {
      const sessionTasks = await getTasksByJoinCode(joinCode);
      setTasks(sessionTasks);
    } catch (error) {
      console.error('Error loading session tasks:', error);
    } finally {
      setIsLoading(false);
    }
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
          <Text style={styles.title}>Alla uppgifter</Text>
          <Text style={styles.subtitle}>
            Totalt: {tasks.length} uppgifter • Din kod: {joinCode}
          </Text>
          
          <View style={styles.viewModeSelector}>
            <TouchableOpacity 
              style={[styles.viewModeButton, viewMode === 'session' && styles.viewModeButtonActive]}
              onPress={() => setViewMode('session')}
            >
              <Text style={[styles.viewModeText, viewMode === 'session' && styles.viewModeTextActive]}>
                Denna session
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.viewModeButton, viewMode === 'all' && styles.viewModeButtonActive]}
              onPress={() => setViewMode('all')}
            >
              <Text style={[styles.viewModeText, viewMode === 'all' && styles.viewModeTextActive]}>
                Alla uppgifter
              </Text>
            </TouchableOpacity>
          </View>
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
            onRefresh={viewMode === 'all' ? loadAllTasks : loadSessionTasks}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Inga uppgifter hittades</Text>
            <Text style={styles.emptySubtext}>
              {viewMode === 'session' 
                ? 'Gå tillbaka till hemsidan för att skapa uppgifter' 
                : 'Inga uppgifter finns i databasen'}
            </Text>
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.push(`/host/host?code=${joinCode}`)}
            >
              <Text style={styles.backButtonText}>Tillbaka till hem</Text>
            </TouchableOpacity>
          </View>
        )}
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
          style={[styles.navButton, styles.activeNavButton]}
          onPress={() => router.push(`/host/tasks?code=${joinCode}`)}
        >
          <Text style={[styles.navButtonText, styles.activeNavButtonText]}>
            Uppgifter
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/settings?code=${joinCode}`)}
        >
          <Text style={styles.navButtonText}>Inställningar</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  viewModeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    alignItems: 'center',
  },
  viewModeButtonActive: {
    backgroundColor: '#007AFF',
  },
  viewModeText: {
    fontSize: 14,
    color: '#666',
  },
  viewModeTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  tasksList: {
    paddingHorizontal: 20,
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
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
  activeNavButton: {
    backgroundColor: '#f0f7ff',
  },
  navButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  activeNavButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});