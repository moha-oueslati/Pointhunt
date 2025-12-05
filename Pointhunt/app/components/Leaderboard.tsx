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
    
    return( //Mappar alla team objekt (när det väl inte är hårdkodat)
        <View>
            <li>
                {teams.map(team => (
                    <p key={team.name + 12345}> {team.name} Total points: {team.points} </p>
                ))}
            </li>
        </View>
    );
}