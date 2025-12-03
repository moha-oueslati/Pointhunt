import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Guest() {
  const router = useRouter();
  const [code, setCode] = useState("");

  async function handleJoin() {
    if (code.trim() === "") {
      Alert.alert("Error", "Please enter a code.");
      return;
    }

    const ref = doc(db, "codes", code);
    const snap = await getDoc(ref);

    if (snap.exists()) {

      router.push({
  pathname: "/waiting",
  params: { code: code }
});

    } else {
      Alert.alert("Invalid Code", "No game found with that code.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join!</Text>

      <TextInput
        placeholder="Skriv kod"
        value={code}
        onChangeText={setCode}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleJoin}>
        <Text style={styles.buttonText}>Join...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A8EFAB",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#614417",
    marginBottom: 40,
  },
  input: {
    width: 225,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#614417",
    paddingVertical: 14,
    borderRadius: 10,
    width: 225,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
    input: {
    width: 225, // samma bredd som knappen
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center", // centrerar texten i mitten
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#614417", //mörkbrunt
    marginBottom: 40
},
});
