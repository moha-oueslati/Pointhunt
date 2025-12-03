// app/settings.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();
  const [huntName, setHuntName] = useState('Mitt Pointhunt');
  const [hostName, setHostName] = useState('Värdens namn');

  const saveSettings = () => {
    Alert.alert('Sparat!', 'Dina inställningar är nu sparade.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Inställningar</Text>
          <Text style={styles.subtitle}>Hantera din pointhunt</Text>
        </View>

        <View style={styles.settingsForm}>
          <Text style={styles.label}>Pointhunt namn</Text>
          <TextInput
            style={styles.input}
            value={huntName}
            onChangeText={setHuntName}
            placeholder="Namn på ditt pointhunt"
          />

          <Text style={styles.label}>Ditt namn som värd/host</Text>
          <TextInput
            style={styles.input}
            value={hostName}
            onChangeText={setHostName}
            placeholder="Ditt namn"
          />

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={saveSettings}
          >
            <Text style={styles.saveButtonText}>Spara inställningar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* navigation bar i botten */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/host')}
        >
          <Text style={styles.navButtonText}>Hem</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/tasks')}
        >
          <Text style={styles.navButtonText}>Uppgifter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.activeNavButton]}
          onPress={() => router.push('/settings')}
        >
          <Text style={[styles.navButtonText, styles.activeNavButtonText]}>
            Inställningar
          </Text>
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
  },
  settingsForm: {
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
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