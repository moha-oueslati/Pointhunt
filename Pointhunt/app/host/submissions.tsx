import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { TaskSubmission } from "../types/Task";
import { router, useLocalSearchParams } from "expo-router";


export default function HostReviewScreen() {
  const params = useLocalSearchParams();

  // Hämta joinCode från URL-parametrar
  const joinCode = params.code ? String(params.code) : 'ABCD';

  const [submissions, setSubmissions] = useState<TaskSubmission[]>([
    {
      id: "1",
      taskId: "101",
      teamId: "guestA",
      videoRef: "https://firebasestorage.googleapis.com/....",
      submittedAt: new Date(),
      status: "pending",
    },
  ]);

  const handleUpdateStatus = (id: string, newStatus: "approved" | "declined") => {
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );

    Alert.alert("Status ändrad", `Status: ${newStatus}`);
  };

  const renderSubmission = ({ item }: { item: TaskSubmission }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Inskickad Uppgift</Text>
      <Text style={styles.subtitle}>Task ID: {item.taskId}</Text>
      <Text style={styles.date}>
        Inskickad: {item.submittedAt.toLocaleString()}
      </Text>

      {/* Ska egentligen vara en videospelare */}
      <Image
        style={{ width: 640, height: 320, borderRadius: 8 }}
        source={require("../pics/hot_dog_with_mustard.png")}
        resizeMode="cover"
      />

      {/* Status Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleUpdateStatus(item.id, "approved")}
        >
          <Text style={styles.buttonText}>Godkänn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.declineButton]}
          onPress={() => handleUpdateStatus(item.id, "declined")}
        >
          <Text style={styles.buttonText}>Neka</Text>
        </TouchableOpacity>
      </View>

      {/* Status Display */}
      <Text style={styles.status}>
        Status:{" "}
        {item.status === "pending"
          ? "⏳ Avvaktar"
          : item.status === "approved"
          ? "✅ Godkänd"
          : "❌ Nekad"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Inskickade Uppgifter ({submissions.length})
      </Text>

      <FlatList
        data={submissions}
        keyExtractor={(item) => item.id}
        renderItem={renderSubmission}
        contentContainerStyle={{ padding: 20 }}
      />
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
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push(`/host/submissions?code=${joinCode}`)}
        >
          <Text style={styles.navButtonText}>Inlämningar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
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

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#555",
  },

  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },

  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  acceptButton: {
    backgroundColor: "#007AFF",
  },

  declineButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  status: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
});
