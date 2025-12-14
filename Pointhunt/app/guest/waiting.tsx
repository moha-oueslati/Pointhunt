import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { where, collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Waiting() {
  const router = useRouter();
const { code } = useLocalSearchParams<{ code?: string }>();
const docId = code;
  console.log("Waiting room code:", code);

  const [dots, setDots] = React.useState(".");

useEffect(() => {
  if (!docId) return;

  const checkStatus = async () => {
    const gamesRef = collection(db, "games");
    const q = query(gamesRef, where("joinCode", "==", docId));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const data = snap.docs[0].data(); //Kolla om spelet redan är aktivt
      if (data?.status === "active") {
        router.replace({ pathname: "/guest/hem", params: { code: docId } });
        return;
      }

      //Fixa snapshot listener i waiting room
      const gameRef = snap.docs[0].ref;
      const unsubscribe = onSnapshot(gameRef, (snapshot) => {
        const data = snapshot.data();
        if (data?.status === "active") {
          router.replace({ pathname: "/guest/hem", params: { code: docId } });
        }
      });
      return unsubscribe;
    }
  };

  const unsubPromise = checkStatus();
  return () => {
    unsubPromise?.then((unsub) => unsub && unsub());
  };
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
    color: "#B89DFF",
    fontWeight: "bold",
  },
});
