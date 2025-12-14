import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Navbar from "./navbar";

export default function Hem() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Välkommen till Poängjakten</Text>
        </View>
        <View style={styles.teamContainer}>
          <Text style={styles.teamText}>Ditt lag: Lag 67</Text>
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <Navbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AEDDFF",
    flexDirection: "column",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  header: {
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#151B7C",
  },
  teamContainer: {
    marginBottom: 20,
  },
  teamText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  videoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
