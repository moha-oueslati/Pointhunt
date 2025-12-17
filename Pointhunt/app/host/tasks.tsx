// app/tasks.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getTasksByJoinCode } from '../firebase/taskService';
import { Task } from '../types/Task';

export default function AllTasks() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const joinCode = params.code ? String(params.code) : 'ABCD';

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getTasksByJoinCode(joinCode)
      .then((data) => {
        if (mounted) setTasks(data);
      })
      .catch(() => {
        if (mounted) setTasks([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [joinCode]);

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskSummary}>{item.summary}</Text>
      <View style={styles.taskDetails}>
        <Text style={styles.taskLocation}>{item.location}</Text>
        <Text style={styles.taskPoints}>{item.points} poäng</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#151B7C" />
            <Text style={styles.loadingText}>Laddar uppgifter...</Text>
          </View>
        </View>
        {/* navigation bar i botten */}
        <View style={styles.navBar}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => router.push(`/host/host?code=${joinCode}` as any)}
          >
            <Text style={styles.navButtonText}>Hem</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, styles.activeNavButton]}
            onPress={() => router.push(`/host/tasks?code=${joinCode}` as any)}
          >
            <Text style={[styles.navButtonText, styles.activeNavButtonText]}>
              Uppgifter
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => router.push(`/host/settings?code=${joinCode}` as any)}
          >
            <Text style={styles.navButtonText}>Inställningar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => router.push(`/host/submissions?code=${joinCode}` as any)}
          >
            <Text style={styles.navButtonText}>Submissions</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Alla uppgifter</Text>
          <Text style={styles.subtitle}>Här kommer alla uppgifter visas</Text>
        </View>

        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Inga uppgifter här än</Text>
            <Text style={styles.emptySubtext}>
              Gå tillbaka till hemsidan för att skapa uppgifter
            </Text>
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.push(`/host/host?code=${joinCode}` as any)}
            >
              <Text style={styles.backButtonText}>Tillbaka till hem</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={renderTask}
            contentContainerStyle={styles.tasksList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* navigation bar i botten */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/host?code=${joinCode}` as any)}
        >
          <Text style={styles.navButtonText}>Hem</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.activeNavButton]}
          onPress={() => router.push(`/host/tasks?code=${joinCode}` as any)}
        >
          <Text style={[styles.navButtonText, styles.activeNavButtonText]}>
            Uppgifter
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/settings?code=${joinCode}` as any)}
        >
          <Text style={styles.navButtonText}>Inställningar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/submissions?code=${joinCode}` as any)}
        >
          <Text style={styles.navButtonText}>Submissions</Text>
        </TouchableOpacity>
      </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#151B7C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A786FF',
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
    color: '#151B7C',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#6A4BBC',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#FFDE7D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#6A4BBC',
    fontSize: 16,
    fontWeight: '600',
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
  tasksList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C5E7FF',
    marginBottom: 12,
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
  },
  navButtonText: {
    color: '#151B7C',
    fontSize: 14,
    fontWeight: '600',
  },
  activeNavButtonText: {
    color: '#151B7C',
    fontWeight: 'bold',
  },
});