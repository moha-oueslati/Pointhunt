// app/tasks.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function AllTasks() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Alla uppgifter</Text>
          <Text style={styles.subtitle}>Här kommer alla uppgifter visas</Text>
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Inga uppgifter här än</Text>
          <Text style={styles.emptySubtext}>
            Gå tillbaka till hemsidan för att skapa uppgifter
          </Text>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/host' as any)}
          >
            <Text style={styles.backButtonText}>Tillbaka till hem</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* navigation bar i botten */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/host/host' as any)}
        >
          <Text style={styles.navButtonText}>Hem</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.activeNavButton]}
          onPress={() => router.push('/host/tasks' as any)}
        >
          <Text style={[styles.navButtonText, styles.activeNavButtonText]}>
            Uppgifter
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/host/settings' as any)}
        >
          <Text style={styles.navButtonText}>Inställningar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/host/submissions' as any)}
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
    color: '#A786FF',
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
    color: '#A786FF',
    fontSize: 16,
    fontWeight: '600',
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
    fontWeight: '600',
  },
  activeNavButtonText: {
    color: '#151B7C',
    fontWeight: 'bold',
  },
});