import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TaskFormData } from '../types/Task';

// vilka props den här komponenten tar emot
interface TaskCreationModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (taskData: any) => void;
}

const TaskCreationModal: React.FC<TaskCreationModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    summary: '',
    location: '',
    points: '',
  });

  const handleSave = () => {
    // kolla så att allt är ifyllt
    if (!formData.title.trim()) {
      Alert.alert('Oj då', 'Du måste skriva en titel');
      return;
    }
    if (!formData.summary.trim()) {
      Alert.alert('Oj då', 'Du måste skriva en beskrivning');
      return;
    }
    if (!formData.location.trim()) {
      Alert.alert('Oj då', 'Du måste skriva en plats');
      return;
    }
    const points = parseInt(formData.points);
    if (!formData.points || points <= 0 || isNaN(points)) {
      Alert.alert('Oj då', 'Du måste skriva hur många poäng uppgiften ger');
      return;
    }

    // spara tasks
    onSave({
      title: formData.title.trim(),
      summary: formData.summary.trim(),
      location: formData.location.trim(),
      points: points,
    });

    // rensa formuläret och stäng popup-fönstret
    setFormData({
      title: '',
      summary: '',
      location: '',
      points: '',
    });
    onClose();
  };

  const handleCancel = () => {
    // rensa allt och stäng utan att spara
    setFormData({
      title: '',
      summary: '',
      location: '',
      points: '',
    });
    onClose();
  };

  const updateField = (field: keyof TaskFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Skapa ny uppgift</Text>
        </View>

        <ScrollView style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Titel *</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(value) => updateField('title', value)}
              placeholder="Skriv titel på uppgiften"
              placeholderTextColor="#999"
              maxLength={100}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Beskrivning *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.summary}
              onChangeText={(value) => updateField('summary', value)}
              placeholder="Beskriv vad man ska göra"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Plats *</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(value) => updateField('location', value)}
              placeholder="Var ska man göra uppgiften?"
              placeholderTextColor="#999"
              maxLength={100}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Poäng *</Text>
            <TextInput
              style={styles.input}
              value={formData.points}
              onChangeText={(value) => updateField('points', value)}
              placeholder="Hur många poäng ger uppgiften?"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Avbryt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Spara uppgift</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TaskCreationModal;