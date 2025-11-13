import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>    
    <Text style={styles.title}> Welcome to Pointhunt! </Text>

    <TouchableOpacity style={styles.redButton}
    accessibilityRole="button"
    accessibilityLabel="Join as Host"
    onPress={() => console.log('Join as Host pressed')}
    >
    <Text style={styles.lightRedText}> Join as Host </Text>
    </TouchableOpacity>
        
    <TouchableOpacity style={styles.yellowButton}
     accessibilityRole="button"
     accessibilityLabel="Join as Guest"
     onPress={() => router.push('/guest')} 

    >
      <Text style={styles.lightYellowText}> Join as Guest </Text>
    </TouchableOpacity>
    </View>
  ); 
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151B7C" //Mörkblått till bakgrunden
},
title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#CCB307", //Gult
    marginBottom: 40
},
redButton: {
    backgroundColor: '#8C070C', //mörkrött
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    width: 225,
    alignItems: "center",
},
yellowButton: {
    backgroundColor: '#CCB307', //gult
    paddingVertical: 14,
    borderRadius: 10,
    width: 225,
    alignItems: "center",
},
lightRedText: {
  color: '#FFAEB1', //rosa
  fontSize: 18,
},
lightYellowText: {
  color: '#FFF8C7', //ljusgult
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
writeTextfield: { // För hostsidan när man skriver in titel/namn på host
  paddingVertical: 8,
  backgroundColor: "rgba(140, 7, 12, 0.75)", //mörkrött 25% transparent
  borderRadius: 8,
  borderWidth: 2,
  borderColor: '#CCB307', //gul ram
  marginBottom: 20,
  width: 225,
}
});



