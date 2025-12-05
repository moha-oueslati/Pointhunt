import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

// Guest
export default function Navbar() {
  const router = useRouter();

  /* Försökte göra knapparna animerade vid tryckning, funka typ inte
  const [scale] = useState(new Animated.Value(1));
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  }
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  } */
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 0,
      }}
    >
      <View style={[styles.navbar]}>
        {/*Denna knapp kanske behöver en bild*/}
        <TouchableOpacity onPress={() => router.push("/Hem")}>
          <Image
            source={require("../assets/images/hemImg.png")}
            style={[styles.Image]}
          />
          <Text style={[styles.Text]}>Hem</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.navbar]}>
        {" "}
        {/*Denna knapp kanske behöver en bild*/}
        <TouchableOpacity onPress={() => router.push("/Tabell")}>
          <Image
            source={require("../assets/images/LeaderboardImg.png")}
            style={[styles.Image]}
          />
          <Text style={[styles.Text]}>Tabell</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.navbar]}>
        {" "}
        {/*Denna knapp kanske behöver en bild*/}
        <TouchableOpacity onPress={() => router.push("/TaskInterface")}>
          <Image
            source={require("../assets/images/cameraImg.png")}
            style={[styles.Image]}
          />
          <Text style={[styles.Text]}>Ladda upp</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.navbar]}>
        {" "}
        {/*Denna knapp kanske behöver en bild*/}
        <TouchableOpacity onPress={() => router.push("/PointList")}>
          <Image
            source={require("../assets/images/ListaImg.png")}
            style={[styles.Image]}
          />
          <Text style={[styles.Text]}>Lista</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.navbar]}>
        {" "}
        {/*Denna knapp kanske behöver en bild*/}
        <TouchableOpacity onPress={() => router.push("/Profil")}>
          <Image
            source={require("../assets/images/profilImg.png")}
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
    backgroundColor: "darkgrey",
    //width behöver inte sättas då flex:1 sköter det
    height: 60,
    //Alignerar items i knappen
    alignItems: "center",
    //Ger kant mellan knapparna
    borderRightWidth: 1,
    borderLeftWidth: 1,
    //Färg kan ändras efter behov
    borderColor: "lightgrey",
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
