import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { TaskSubmission } from "../types/Task";
import VideoSpelare from "../VideoSpelare";


export default function HostReviewScreen() {

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

      {/* Firebase video */}
      <VideoSpelare path={item.videoRef} h={360} w={640} />

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
