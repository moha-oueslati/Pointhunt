import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Guest
export default function Navbar() {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 0,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {/*Denna knapp kanske behöver en bild*/}
        <TouchableOpacity onPress={() => router.push("./home")}>
          <Text>Hem</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        {/*Denna knapp kanske behöver en bild*/}
        <TouchableOpacity onPress={() => router.push("/Leaderboard")}>
          <Text>Lagtabell</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        {/*Denna knapp kanske behöver en bild*/}
        <TouchableOpacity onPress={() => router.push("./TaskInterface")}>
          <Text>Ladda upp</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        {/*Denna knapp kanske behöver en bild*/}
        <TouchableOpacity onPress={() => router.push("/PointList")}>
          <Text>Uppdragslista</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        {/*Denna knapp kanske behöver en bild*/}
        <TouchableOpacity onPress={() => router.push("/TeamInfo")}>
          <Text>Ditt lag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
