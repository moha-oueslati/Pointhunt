// app/index.tsx
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { codeGenerate } from "../app/firebase/codeGenerator";

export default function Index() {
  const router = useRouter();
  const [code, setCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function run() {
      const generated = await codeGenerate("host-session");
      console.log("Generated code:", generated);
      setCode(generated);
    }
    run();
  }, []);

  return (
    <View style={styles.container}>    
      <Text style={styles.title}>Welcome to Pointhunt!</Text>

      <TouchableOpacity
        style={styles.purpleButton}
        accessibilityRole="button"
        accessibilityLabel="Join as Host"
        onPress={() => {
          if (!code) {
            alert("Generating code, please wait...");
            return;
          }
          // Navigate to /host/host with the generated code
          router.push(`/host/host?code=${code}`);
        }}
      >
        <Text style={styles.lightYellowText}>Join as Host</Text>
      </TouchableOpacity>
        
      <TouchableOpacity
        style={styles.yellowButton}
        accessibilityRole="button"
        accessibilityLabel="Join as Guest"
        onPress={() => router.push('/guest')}
      >
        <Text style={styles.lightPurpleText}>Join as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AEDDFF"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#7179FF",
    marginBottom: 40
  },
  purpleButton: {
    backgroundColor: '#B89DFF',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    width: 225,
    alignItems: "center",
  },
  yellowButton: {
    backgroundColor: '#FFDE7D',
    paddingVertical: 14,
    borderRadius: 10,
    width: 225,
    alignItems: "center",
  },
  lightYellowText: {
    color: '#FFDE7D',
    fontSize: 18,
  },
  lightPurpleText: {
    color: '#B89DFF',
    fontSize: 18,
  },
});