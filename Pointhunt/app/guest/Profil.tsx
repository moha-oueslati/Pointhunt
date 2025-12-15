import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Navbar from "./navbar";
import VideoSpelare from "../VideoSpelare";

export default function Profil() {
  return (
    <>
      <View style={styles.container}>

          {/*Lag namns text (större text)*/}
          <Text style={styles.teamName}>Lag 67</Text>
          
          {/* Profilbild*/}
          <Image src="" alt=""style={styles.profileImage}
          />
          {/*Poäng för laget*/}
          <Text style={styles.points}>Poäng: 120</Text>
          
          {/*Margin sätter vart navbar hamnar just nu,
           inte speciellt najs men vet typ inte hur det ska fixas */
          }
          
          {/*Flöde av lagets alla videoklipp
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Klipp:</Text>
          <VideoSpelare
            path={require("../assets/julhalsning_final.mp4")}
            h={180}
            w={'100%'}
          />
*/}
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
    fontWeight: "700",
    color: "#A786FF",
    marginBottom: 20,
  },

  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,         
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#A786FF",
    marginBottom: 20,
  },

  points: {
    fontSize: 26,
    fontWeight: "600",
    color: "#A786FF",
    marginBottom: 30,
  },
});