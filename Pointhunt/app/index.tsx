import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Index() {
  

  // Css till texten för "Lag: 1" och "10 poäng" är att de ska sitta på motsatt sida av samma rad
  // "Lag: 1" kommer alltså att sitta på vänster sida och "10 poäng" på höger sida
  // Text inputen är en placeholder tills vi har en hårdkodad lista som vi kan skicka in i en funktion för "PointInfo.tsx"
  return (
    <View style={styles.container}>    
    <Text style={styles.title}> Welcome to Pointhunt! </Text>

    <TouchableOpacity style={styles.greenButton}>
      <Text style={styles.lightGreenText}> Join as Host </Text>
    </TouchableOpacity>
        
    <TouchableOpacity style={styles.brownButton}>
      <Text style={styles.lightBrownText}> Join as Guest </Text>
    </TouchableOpacity>
    </View>
  ); 
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A8EFAB" //ljusgrönt till bakgrunden
},
title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#614417", //mörkbrunt
    marginBottom: 40
},
greenButton: {
    backgroundColor: '#0F6B0A', //mörkgrönt
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    width: 225,
    alignItems: "center",
},
brownButton: {
    backgroundColor: '#614417', //mörkbrunt
    paddingVertical: 14,
    borderRadius: 10,
    width: 225,
    alignItems: "center",
},
lightGreenText: {
  color: '#7DFD81', //ljusgrön
  fontSize: 18,
},
lightBrownText: {
  color: '#FFD89A', //ljusbrunt eller beige
  fontSize: 18,
},
darkGreenText: {
  color: '#7DFD81',
  fontSize: 18,
},
darkBrownText: {
  color: '#614417',
  fontSize: 18,
},
codeTextfield: { // Till när man lägger in kod
  paddingVertical: 14,
  borderRadius: 10,
  width: 225,
  alignItems: "center",
},
writeTextfield: { // För hostsidan när man skriver in titel/namn på host
  paddingVertical: 8,
  borderRadius: 8,
  width: 225,
  alignItems: "center",
}
});


