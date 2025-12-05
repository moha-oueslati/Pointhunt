import React from "react";
import { View, Text, ScrollView } from "react-native";
import VideoSpelare from "./VideoSpelare";
import Navbar from "./navbar";

export default function Hem() {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginTop: 50 }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Välkommen till Poängjakten
          </Text>
        </View>
        <View style={{ flex: 1, marginBottom: 20 }}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
          >
            Ditt lag: Lag 67
          </Text>
        </View>
        <View style={{ flex: 6 }}>
          <VideoSpelare
            path={require("../assets/Gyckel2_kebab.mp4")}
            w={320}
            h={180}
          />
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, flex: 1, width: "100%" }}>
        <Navbar />
      </View>
    </View>
  );
}
