import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Waiting() {
  const router = useRouter();
  const { code } = useLocalSearchParams<{ code?: string | string[] }>();
  console.log("Waiting room code:", code);

  const docId = code ? (Array.isArray(code) ? code[0] : code) : undefined;
  const [dots, setDots] = React.useState(".");

  useEffect(() => {
    if (!docId) return;

    const gameRef = doc(db, "codes", docId);

    const unsubscribe = onSnapshot(gameRef, (snapshot) => {
      const data = snapshot.data();
      console.log("Snapshot data:", data);

      if (data?.gameStarted === true) {
        router.replace("/guest/home");
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
      <Text style={styles.text}>Waiting for host to start the game{dots}</Text>
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
    color: "#B89DFF",
    fontWeight: "bold",
  },
});
