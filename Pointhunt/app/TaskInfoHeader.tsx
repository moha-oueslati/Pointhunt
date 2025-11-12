import React from "react";
import {Text} from "react-native";


export default function TaskInfoHeader({task}:{
  task: { mission: string; points: number, index: number}
}){
    return(
        <view>
            <hr />
            <h1><Text>{task.index} - </Text><Text> {task.mission} </Text></h1>
            <p>{task.points} Poäng</p>
            <hr />
        </view>
    );
}