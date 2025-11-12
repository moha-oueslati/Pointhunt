import React from 'react';
import { View } from "react-native";

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
    
    return(
        <View>
            <h2>Teams</h2>
            <li>
                {teams.map(team => (
                    <p> {team.name} Total points: {team.points} </p>
                ))}
            </li>
        </View>
    );
}