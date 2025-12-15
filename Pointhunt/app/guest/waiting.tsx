import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Waiting() {
  const router = useRouter();
const { code } = useLocalSearchParams<{ code?: string }>();
const docId = code;
  console.log("Waiting room code:", code);

  const [dots, setDots] = React.useState(".");

  useEffect(() => {
    if (!docId) return;

    const gameRef = doc(db, "codes", docId);

    const unsubscribe = onSnapshot(gameRef, (snapshot) => {
      const data = snapshot.data();
      console.log("Snapshot data:", data);

      if (data?.gameStarted === true) {
        router.replace("/guest/hem" as any);
      }
    });

    return () => unsubscribe();
  }, [docId, router]);

  // punkterna rör på sig
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ".";
        else return prev + ".";
      });
    }, 500);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Väntar på att värden ska starta spelet{dots}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#AEDDFF",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    color: "#A786FF",
    fontWeight: "bold",
  },
});
