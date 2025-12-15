import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Navbar from "./navbar";

export default function Profil() {
  return (
    <>
      <View style={styles.container}>

          {/*Lag namns text (större text)*/}
          <Text style={styles.teamName}>Lag 67</Text>
          
          {/* Profilbild*/}
          <Image source={require("../guest/image/christmashat.jpg")} style={styles.profileImage}
          />
          {/*Poäng för laget*/}
          <Text style={styles.points}>Poäng: 120</Text>
          
          {/*Margin sätter vart navbar hamnar just nu,
           inte speciellt najs men vet typ inte hur det ska fixas */
          }
      </View>
      <Navbar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AEDDFF",     // blå bakgrund
    alignItems: "center",
    paddingTop: 60,

  },
  teamName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#A786FF",
    marginTop: 190,
  },

  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,         
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "#A786FF",
    marginTop: 30,
    marginBottom: 20,
  },
  points: {
    fontSize: 26,
    fontWeight: "600",
    color: "#A786FF",
  },
});