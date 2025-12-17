import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

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
      <View style={[styles.navbar]}>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => router.push("/guest/hem")}>
          <Image
            source={require("../guest/image/hemImg.png")}
            style={[styles.Image]}
          />
          <Text style={[styles.Text]}>Hem</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.navbar]}>
        {" "}
        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => router.push("/components/Leaderboard")}>
          <Image
            source={require("../guest/image/LeaderboardImg.png")}
            style={[styles.Image]}
          />
          <Text style={[styles.Text]}>Ledartavla</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.navbar]}>
        {" "}
        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => router.push("/guest/TaskInterface")}>
          <Image
            source={require("../guest/image/cameraImg.png")}
            style={[styles.Image]}
          />
          <Text style={[styles.Text]}>Ladda upp</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.navbar]}>
        {" "}
        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => router.push("/guest/PointList")}>
          <Image
            source={require("../guest/image/ListaImg.png")}
            style={[styles.Image]}
          />
          <Text style={[styles.Text]}>Lista</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.navbar]}>
        {" "}
        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => router.push("/guest/Profil")}>
          <Image
            source={require("../guest/image/profilImg.png")}
            style={[styles.Image]}
          />
          <Text style={[styles.Text]}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    //Färg kan ändras efter behov
    backgroundColor: "#C5E7FF",
    //width behöver inte sättas då flex:1 sköter det
    height: 60,
    //Alignerar items i knappen
    alignItems: "center",
    //Ger kant mellan knapparna
    borderRightWidth: 1,
    borderLeftWidth: 1,
    //Färg kan ändras efter behov
    borderColor: "#AEDDFF",
    textAlign: "center",
  },
  Image: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  TouchableOpacity: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
    height: "100%",
    fontSize: 5,
  },
  Text: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
});