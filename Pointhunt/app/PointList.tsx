import { Text, View, StyleSheet, FlatList } from "react-native";
import PointInfo from "./guest/PointInfo";
import React from "react";
import Navbar from "./components/navbar";

export default function PointList() {
  const PointList = [
    { mission: "Stå på händerna i 10 sekunder", points: 10 },
    { mission: "Shotgunna en 33cl öl på 15 sekunder", points: 15 },
    { mission: "Spring runt Dk på under 1.5 minuter", points: 10 },
    { mission: "Ta en selfie med en främling", points: 5 },
    { mission: "Va kassör på Ica strömmen", points: 10 },
  ];

  // Css till texten för "Lag: 1" och "10 poäng" är att de ska sitta på motsatt sida av samma rad
  // "Lag: 1" kommer alltså att sitta på vänster sida och "10 poäng" på höger sida
  // Text inputen är en placeholder tills vi har en hårdkodad lista som vi kan skicka in i en funktion för "PointInfo.tsx"

  return (
    <>
    <View style={styles.container}>
      <View style={styles.frame}>

        <View style={styles.row}>
          <Text style={styles.textTeam}>Lag: 1</Text>
          <Text style={styles.textTasks}>10 poäng</Text>
        </View>

        <FlatList
          data={PointList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <PointInfo data={item} ndex={index + 1} />
          )}
          contentContainerStyle={styles.listSpacing}
        />
      </View>
    </View>
    <Navbar/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151B7C",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  frame: {
    width: "100%",
    backgroundColor: "#CCB307",
    borderRadius: 20,
    padding: 20,
    marginTop: 40,
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  textTeam: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8C070C",

  },
  textTasks: {
    fontSize: 22,
    color: "#8C070C",
    paddingBottom: 25,
  },

  listSpacing: {
    gap: 15,
    paddingBottom: 25,
  },
});

