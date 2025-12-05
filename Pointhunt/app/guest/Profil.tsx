import React from "react";
import { View, Text, Image } from "react-native";
import Navbar from "./navbar";
import VideoSpelare from "../VideoSpelare";

export default function Profil() {
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          {/*Lag namns text (större text)*/}
          <Text style={{ fontSize: 30 }}> Lag 67</Text>
        </View>
        <View style={{ flex: 1 }}>
          {/* Profilbild*/}
          <Image src="" alt="" />
        </View>
        <View style={{ flex: 1 }}>
          {/*Poäng för laget*/}
          <Text>Hello World</Text>
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: 230 /*Margin sätter vart navbar hamnar just nu,
           inte speciellt najs men vet typ inte hur det ska fixas */,
          }}
        >
            
     {/* 
  Flöde av lagets alla videoklipp
  <Text style={{ fontSize: 25, fontWeight: "bold" }}>Klipp:</Text>
  <VideoSpelare
    path={require("../assets/julhalsning_final.mp4")}
    h={180}
    w={320}
  />
*/}

            
        </View>
      </View>
      <Navbar />
    </>
  );
}
