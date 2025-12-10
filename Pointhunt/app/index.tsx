import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { codeGenerate } from "./firebase/codeGenerator";


export default function Index() {
  const router = useRouter();


  // store generated code in state so it's available to the button handler
  const [code, setCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function run() {
      const generated = await codeGenerate("placeholder");
      console.log(generated);
      setCode(generated);
    }
    run();
  }, []);

  return (
    <View style={styles.container}>    
      <Text style={styles.title}> Välkommen till Pointhunt! </Text>

    <TouchableOpacity
      style={styles.purpleButton}
      accessibilityRole="button"
      accessibilityLabel="Join as Host"
      onPress={() => {
        if (!code) return;
        router.push({ pathname: "/host/host", params: { code: code } });
      }}
    >
      <Text style={styles.lightYellowText}>Gå med som värd </Text>
    </TouchableOpacity>
        
    <TouchableOpacity
      style={styles.yellowButton}
      accessibilityRole="button"
      accessibilityLabel="Join as Guest"
      onPress={() => router.push('/guest/guest' as any)}
    >
      <Text style={styles.lightPurpleText}>Gå med som gäst </Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AEDDFF" //Mörkblått till bakgrunden
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#B89DFF", 
    marginBottom: 40
  },
  purpleButton: {
    backgroundColor: '#B89DFF', //lila
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    width: 225,
    alignItems: "center",
  },
  yellowButton: {
    backgroundColor: '#FFDE7D', //gult
    paddingVertical: 14,
    borderRadius: 10,
    width: 225,
    alignItems: "center",
  },
  lightYellowText: {
    color: '#FFDE7D', //ljusgult
    fontSize: 18,
  },
  lightPurpleText: {
    color: '#B89DFF', //lila
    fontSize: 18,
  },
  redText: {
    color: '#8C070C', //mörkrött
    fontSize: 18,
  },
  yellowText: {
    color: '#CCB307', //gult
    fontSize: 18,
  },
  codeTextfield: { // Till när man lägger in kod
    paddingVertical: 14,
    backgroundColor: "rgba(140, 7, 12, 0.75)", //mörkrött 25% transparent
    borderRadius: 10,
    width: 225,
    alignItems: "center",
  },

});



