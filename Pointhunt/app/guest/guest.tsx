import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from "react-native";
import { useRouter } from "expo-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Guest() {
  const router = useRouter();
  const [code, setCode] = useState("");

  async function handleJoin() {
    if (code.trim() === "") {
      Alert.alert("Error", "Skriv in kod.");
      return;
    }

    try {
      const ref = collection(db, "games");
      const q = query(ref, where("joinCode", "==", code));
      const snap = await getDocs(q);

      if (!snap.empty) {
        //Gå till waitingroom
        router.push({
          pathname: "/guest/waiting",
          params: { code }
        });
      } else {
        Alert.alert("Ogiltig kod", "Inget spel finns med den koden.");
      }
    } catch (err) {
      Alert.alert("Error", "Kan inte ansluta till servern.");
      console.error(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join!</Text>

      <TextInput
        placeholder="Skriv kod..."
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
    backgroundColor: "#AEDDFF",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#7179FF",
    marginBottom: 40,
  },
  input: {
    width: 225,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#B89DFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFDE7D",
    paddingVertical: 14,
    borderRadius: 10,
    width: 225,
    alignItems: "center",
  },
  buttonText: {
    color: "#B89DFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});