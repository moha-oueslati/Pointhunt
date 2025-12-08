// app/host/settings.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { saveHuntSettings, getHuntSettings } from '../firebase/settingsService';

export default function Settings() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [huntName, setHuntName] = useState('Mitt Pointhunt');
  const [hostName, setHostName] = useState('Värdens namn');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Hämta joinCode från URL-parametrar
  const joinCode = params.code ? String(params.code) : 'ABCD';
  
  // Ladda inställningar när komponenten monteras
  useEffect(() => {
    loadSettings();
  }, [joinCode]);
  
  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const settings = await getHuntSettings(joinCode);
      if (settings) {
        setHuntName(settings.huntName);
        setHostName(settings.hostName);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      Alert.alert('Fel', 'Kunde inte ladda inställningar');
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveSettings = async () => {
    if (!huntName.trim() || !hostName.trim()) {
      Alert.alert('Oj då', 'Fyll i båda fälten');
      return;
    }
    
    setIsSaving(true);
    try {
      await saveHuntSettings(joinCode, {
        huntName: huntName.trim(),
        hostName: hostName.trim(),
      });
      Alert.alert('Sparat!', 'Dina inställningar är nu sparade i databasen.');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Fel', 'Kunde inte spara inställningar. Försök igen.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Återställ',
      'Vill du återställa till standardvärden?',
      [
        { text: 'Avbryt', style: 'cancel' },
        { 
          text: 'Återställ', 
          style: 'destructive',
          onPress: () => {
            setHuntName('Mitt Pointhunt');
            setHostName('Värdens namn');
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Inställningar</Text>
          <Text style={styles.subtitle}>
            Hantera din pointhunt • Kod: {joinCode}
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Laddar inställningar...</Text>
          </View>
        ) : (
          <View style={styles.settingsForm}>
            <Text style={styles.label}>Pointhunt namn *</Text>
            <TextInput
              style={styles.input}
              value={huntName}
              onChangeText={setHuntName}
              placeholder="Namn på ditt pointhunt"
              editable={!isSaving}
            />

            <Text style={styles.label}>Ditt namn som värd/host *</Text>
            <TextInput
              style={styles.input}
              value={hostName}
              onChangeText={setHostName}
              placeholder="Ditt namn"
              editable={!isSaving}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.button, styles.resetButton]}
                onPress={handleReset}
                disabled={isSaving}
              >
                <Text style={styles.resetButtonText}>Återställ</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]}
                onPress={saveSettings}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.saveButtonText}>Spara inställningar</Text>
                )}
              </TouchableOpacity>
            </View>
            
            <Text style={styles.infoText}>
              Inställningarna sparas i Firebase och är kopplade till din sessionskod.
            </Text>
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
          style={styles.navButton}
          onPress={() => router.push(`/host/tasks?code=${joinCode}`)}
        >
          <Text style={styles.navButtonText}>Uppgifter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.activeNavButton]}
          onPress={() => router.push(`/host/settings?code=${joinCode}`)}
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
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