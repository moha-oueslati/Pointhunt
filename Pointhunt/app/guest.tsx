    import { View, Button, Text,TextInput } from "react-native";
    import React, { useState } from "react";


    export default function Guest() {
  const [code, setCode] = useState("");

    return (
        <View  style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >
                    <Text> Join!</Text>
            <TextInput placeholder ="Enter code" 
            value ={code}
            onChangeText ={setCode}
            />
        <Button
            title="Join..."
            onPress={() => {
            console.log("Button Pressed");
                    console.log(code);

            }}
            
        />
                    

        </View>
    );
    }
