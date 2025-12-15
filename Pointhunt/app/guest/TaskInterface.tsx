import React, { useState } from "react";
import { View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  TextInput,
  ScrollView } from "react-native";
import TeamButton from "./TeamButton";
import Navbar from "./navbar";

// Guest
export default function TaskInterface() {
  const [open, setOpen] = useState(false);
  const [num, setSwaped] = useState(0);
  const filePic = require("../guest/image/pictureupload.png");

  const toggleDropDown = () => {
    setOpen((open) => !open);
  };
  const handleChange = (num2: number) => {
    setSwaped(num2);
    setOpen(false);
  };
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
  return (
    <>
      <ScrollView   style={{ 
        backgroundColor: "#AEDDFF",
        paddingBottom: 120, }} 
        contentContainerStyle={styles.container}>
        <Text style={styles.header}>
          Uppgift 1:{" "}
        </Text>
        <Text style={styles.mission}>Stå på händerna i 10 sekunder</Text>
      
      <View
        style={styles.teamWrapper}>
        <TouchableOpacity
          onPress={() => {
            toggleDropDown();
          }}
          key={num}
          style={styles.teamButton}
        >
          <Text style={styles.teamText}>{getTitle(num)}</Text>
        </TouchableOpacity>
        {open && (
          <View style={styles.teamList}>
            <TeamButton key={1} index={1} change={handleChange} topnum={num} />
            <TeamButton key={2} index={2} change={handleChange} topnum={num} />
          </View>
        )}
      </View>

      <View style={styles.inputBox}>
        <label htmlFor="VidInput">
        <Image source={filePic} style={styles.uploadImage}/>
      <input style={styles.label} type="file" accept="video/*" id="VidInput" hidden/>
      <TouchableOpacity style={styles.uploadButton}>
      <Text style={styles.uploadText}>Ladda upp fil här!</Text>
      </TouchableOpacity>
      </label>
      </View>
     
        <Text style={styles.teamText}>
          Beskrivning
        </Text>
        <TextInput style={styles.textInput} 
        placeholder="Vad har ni gjort?"
        placeholderTextColor="#999"/>
         <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Skicka</Text>
        </TouchableOpacity>
      </ScrollView>
     
       
      <View>
        <Navbar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AEDDFF",
    padding: 20,
    alignItems: "center",
    paddingBottom: 120,
  },
  header: {
    fontSize: 44,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#1A2553",
  },

  mission: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
    color: "#1A2553",
    marginTop: 10,
  },

  teamWrapper: {
    marginBottom: 10,
    alignItems: "center",
  },

  teamButton: {
    backgroundColor: "#FFEBAF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD65D',
    width: 220,
  },

  teamText: {
    fontSize: 18,
    color: '#B89DFF',
    textAlign: "center",
    fontWeight: 'bold',
  },
  teamList: {
    marginTop: 10,
    padding: 3,
    borderColor: '#000',
    width: 180,

  },
  inputBox: {
    alignItems: "center",
    marginBottom: 25,
    height: 300,
    width: 300,
    borderRadius: 10,
    backgroundColor: "#C5E7FF",
  },
  uploadImage: {
    width: 150,
    height: 150,
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    width: 200,
    fontWeight: "bold",
    marginTop: 30,
    color: "#1A2553",
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: "#B89DFF",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  uploadText: {
    fontSize: 18,
    color: "#FFDE7D", 
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    width: '50%',
    marginBottom: 10,
    marginTop: 10,
    color: "black",
  },

  sendButton: {
    backgroundColor: "#FFEBAF",
    width: 220,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  sendText: {
    color: "#B89DFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});