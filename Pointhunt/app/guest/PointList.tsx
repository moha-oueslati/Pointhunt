import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import PointInfo from "./PointInfo";
import Navbar from "./navbar";

// Guest
export default function PointList() {
  const points = [
    {
      mission: "Stå på händerna i 10 sekunder",
      points: 10,
    },
    {
      mission: "Shotgunna en 33cl öl på 15 sekunder",
      points: 15,
    },
    {
      mission: "Spring runt Dk på under 1.5 minuter",
      points: 10,
    },
    {
      mission: "Ta en selfie med en främling",
      points: 5,
    },
    {
      mission: "Va kassör på Ica strömmen",
      points: 10,
    },
  ];
  // Css till texten för "Lag: 1" och "10 poäng" är att de ska sitta på motsatt sida av samma rad
  // "Lag: 1" kommer alltså att sitta på vänster sida och "10 poäng" på höger sida
  // Text inputen är en placeholder tills vi har en hårdkodad lista som vi kan skicka in i en funktion för "PointInfo.tsx"
  return (
    <>

<ScrollView   style={{ 
        backgroundColor: "#AEDDFF",}} 
        contentContainerStyle={[styles.container, { paddingBottom: 120 }]}>
        <Text style={styles.title}>Poänglista</Text>
        <View style={styles.frame}>
          {points.map((obj, index) => (
          <View key={index} style={styles.taskContainer}>
          <PointInfo data={obj} ndex={index + 1}/>
          </View>
        ))}
        </View>
        </ScrollView> 
      <View>
        <Navbar />
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AEDDFF",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#A786FF", 
    marginTop: 30,
},
  frame: {
    backgroundColor: "#FFEBAF",
    borderRadius: 20,
    padding: 20,
    marginTop: 40,
  },
  taskContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

});

