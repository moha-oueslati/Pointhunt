//GUEST (kanske också host?)

import React from 'react';
import { View, Text, StyleSheet } from "react-native";

//Displayar teams och dess info (för tillfället bara namn och poäng, ska något mer läggas till?)
export default function DisplayTeam(/*team: {name: string, points: number}*/) { 
    
    const team = {
    name: "Test team", points: 55,
}   
    //Hårdkodat
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Alla teams</Text>
            <View style={styles.row}>
            <Text style={styles.team}>{team.name}</Text>
            <Text style={styles.points}>Total poäng: {team.points}p</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#AEDDFF" //Ljusblått till bakgrunden
  },
  title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#7179FF", //Mörkblått
      marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    width: 300,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  team: {
    fontSize: 20,
    flex: 1, 
    fontWeight: "bold",
    color: "#6A4BBC", //Mörklila
  },

  points: {
    fontSize: 20,
    color: "#B89DFF", //Ljuslila
  },
});