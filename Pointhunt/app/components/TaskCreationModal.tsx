// app/components/TaskCreationModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

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
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [location, setLocation] = useState('');
  const [points, setPoints] = useState('');

  const handleSave = () => {
    // kolla så att allt är ifyllt
    if (!title.trim()) {
      Alert.alert('Oj då', 'Du måste skriva en titel');
      return;
    }
    if (!summary.trim()) {
      Alert.alert('Oj då', 'Du måste skriva en beskrivning');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Oj då', 'Du måste skriva en plats');
      return;
    }
    const pointsNum = parseInt(points);
    if (!points || pointsNum <= 0 || isNaN(pointsNum)) {
      Alert.alert('Oj då', 'Du måste skriva hur många poäng uppgiften ger');
      return;
    }

    // spara uppgiften
    onSave({
      title: title.trim(),
      summary: summary.trim(),
      location: location.trim(),
      points: pointsNum,
    });

    // rensa formuläret och stäng popup-fönstret
    setTitle('');
    setSummary('');
    setLocation('');
    setPoints('');
    onClose();
  };

  const handleCancel = () => {
    // rensa allt och stäng utan att spara
    setTitle('');
    setSummary('');
    setLocation('');
    setPoints('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Skapa ny uppgift</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Titel *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Skriv titel på uppgiften"
          />

          <Text style={styles.label}>Beskrivning *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={summary}
            onChangeText={setSummary}
            placeholder="Beskriv vad man ska göra"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Plats *</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Var ska man göra uppgiften?"
          />

          <Text style={styles.label}>Poäng *</Text>
          <TextInput
            style={styles.input}
            value={points}
            onChangeText={setPoints}
            placeholder="Hur många poäng ger uppgiften?"
            keyboardType="number-pad"
          />
        </View>

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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
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