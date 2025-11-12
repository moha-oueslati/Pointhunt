import React from 'react';
import { View } from "react-native";

//Displayar teams och dess info (för tillfället bara namn och poäng, ska något mer läggas till?)
export default function DisplayTeam(/*team: {name: string, points: number}*/) { 
    
    const team = {
    name: "Test team", points: 55
}   
    //Hårdkodat
    return(
        <View>
            <h2>{team.name}</h2>
            <p>Total points: {team.points}</p>
        </View>
    );
}