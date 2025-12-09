import React from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Navbar from "../guest/navbar";

//Displayar teams med högst poäng (ej sorterat än)
export default function Leaderboard() { 

    //Hårdkodat teams och dess innehåll för tillfället
    const teams = [
        {
            name: "Team One", points: 20
        },
        {
            name: "Team Two", points: 15
        }
    ]
    
    return( //Mappar alla team objekt (när det väl inte är hårdkodat)
        <>
        <ScrollView  style={{ 
        backgroundColor: "#AEDDFF",}} 
        contentContainerStyle={styles.container}>
            <Text style={styles.title}>Ledartavla</Text>
            <li>
                {teams.map((team, index) => (
                    <View key={team.name} style={styles.row}> 
                    <Text style={styles.rank}>{index + 1}.</Text>
                    <Text style={styles.team}>{team.name}</Text>
                    <Text style={styles.points}>Totala poäng: {team.points}p</Text>
                    </View>
                ))}
            </li>
        </ScrollView>
        <Navbar/>
        </>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 200,
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
    width: 350,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "center",
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
    width: 30,
    color: "#6A4BBC",
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