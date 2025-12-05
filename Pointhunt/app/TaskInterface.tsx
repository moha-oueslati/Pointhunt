import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import TeamButton from "./TeamButton";
import Navbar from "./navbar";
import { useState } from "react";

// Guest
export default function TaskInterface() {
  const [open, setOpen] = useState(false);
  const [num, setSwaped] = useState(0);

  //Funktion för att öppna/stänga dropdownmenyn
  const toggleDropDown = () => {
    setOpen((open) => !open);
  };
  //Funktion för att byta lag i dropdownmenyn
  const handleChange = (num2: number) => {
    setSwaped(num2);
    setOpen(false);
  };
  //Funktion för att få rätt text i dropdownmenyn
  const getTitle = (num: number) => {
    switch (num) {
      case 1:
        return "Lag 1";
      case 2:
        return "Lag 2";
      default:
        return "Välj Lag";
    }
  };
  // funktion för att skcika till firebase server, vet ej hur den funkar ännu
  const sendToServer = () => {};
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 44,
            fontWeight: "bold",
          }}
        >
          Uppgift 1:{" "}
        </Text>
        <Text>Stå på händerna i 10 sekunder</Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[Styles.TeamButton]}
          onPress={() => {
            toggleDropDown();
          }}
          key={num}
        >
          <Text>{getTitle(num)}</Text>
        </TouchableOpacity>
        {open && (
          <View>
            <TeamButton
              key={1}
              index={1}
              change={handleChange}
              topnum={num}
              styles={[Styles.TeamButton]}
            />
            <TeamButton
              key={2}
              index={2}
              change={handleChange}
              topnum={num}
              styles={[Styles.TeamButton]}
            />
          </View>
        )}
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label htmlFor="VidInput" style={Styles.dropArea}>
          <input type="file" accept="video/*" id="VidInput" hidden />
          <Image
            source={require("../assets/images/uploadImg.png")}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </label>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          Beskrivning
        </Text>
        <input type="text" />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity>
          <Text>Skicka</Text>
        </TouchableOpacity>
      </View>
      {/*Separat view för att navbar ska funka*/}
      <View>
        <Navbar />
      </View>
    </>
  );
}

const Styles = StyleSheet.create({
  TeamButton: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "gray",
    margin: 5,
    borderRadius: 5,
  },
  dropArea: {
    width: 24, //bildens storlek
    height: 24,
    padding: 20,
    backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
