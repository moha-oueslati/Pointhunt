    import { View, TouchableOpacity, Text,TextInput , StyleSheet } from "react-native";
    import React, { useState } from "react";


    export default function Guest() {
  const [code, setCode] = useState("");

    return (
        <View  style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#A8EFAB"
        }}
        >
    <Text style={styles.title}> Join!</Text>
            <TextInput placeholder ="Enter code" 
            value ={code}
            onChangeText ={setCode}
                    style={styles.input}

            />
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("Button Pressed");
          console.log(code);
        }}
      >
        <Text style={styles.buttonText}>Join...</Text>
      </TouchableOpacity>
                    

        </View>
    );
    }
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#614417", // mörkbrunt
    paddingVertical: 14,
    borderRadius: 10,
    width: 225,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
    input: {
    width: 225, // samma bredd som knappen
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center", // centrerar texten i mitten
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#614417", //mörkbrunt
    marginBottom: 40
},
});
