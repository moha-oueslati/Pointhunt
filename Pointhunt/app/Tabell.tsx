import React from "react";
import { View, Text } from "react-native";
import Navbar from "./navbar";
//Guest sida
export default function Tabell() {
  return (
    <>
      <View>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 50,
          }}
        >
          PoängTabell
        </Text>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "lightgrey",
              height: 48,
              width: 240,
              marginBottom: 10,
              borderRadius: 5,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>1. Lag 5 </Text>
            <Text> 20 poäng</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "lightgrey",
              height: 48,
              width: 240,
              marginBottom: 10,
              borderRadius: 5,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>2. Lag 67 </Text>
            <Text> 15 poäng</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "lightgrey",
              height: 48,
              width: 240,
              marginBottom: 10,
              borderRadius: 5,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>3. Lag 4 </Text>
            <Text> 10 poäng</Text>
          </View>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Navbar />
      </View>
    </>
  );
}
