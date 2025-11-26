import { Text, View, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
// import { onValue, ref } from "firebase/database";
// import { db } from "../firebase"; 

export default function Waiting() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Waiting for host to start the game...</Text>
<Button title="Secret Button" onPress={() => { router.push('/TaskInterface') }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    backgroundColor: "#A8EFAB",
  },
  row: {
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
