import { Text, View } from "react-native";
import PointInfo from "./PointInfo";

export default function Index() {
  

  // Css till texten för "Lag: 1" och "10 poäng" är att de ska sitta på motsatt sida av samma rad
  // "Lag: 1" kommer alltså att sitta på vänster sida och "10 poäng" på höger sida
  // Text inputen är en placeholder tills vi har en hårdkodad lista som vi kan skicka in i en funktion för "PointInfo.tsx"
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >    
        

        <button> Host</button>
    <button>
      Guest
    </button>
    </View>
  );
}