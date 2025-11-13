//TESTAMILJÖ
//Bara för att kasta ihop komponenter och bygga en testsida

import React from 'react';
import { View } from "react-native";
import PointInfo from './PointInfo';
import Leaderboard from './Leaderboard';
import DisplayTeam from './TeamInfo';

export default function TestEnvironment() {
    return(
        <View>
            <PointInfo data={{mission: "Exempeluppgift", points: 10}} ndex={1} />
            <Leaderboard />
            <DisplayTeam />
        </View>
    )
}