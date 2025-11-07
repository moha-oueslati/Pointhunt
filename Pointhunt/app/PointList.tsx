import { Text, View } from "react-native";
import PointInfo from "./PointInfo";


export default function PointList(){
    const PointList = [{
        mission:"Stå på händerna i 10 sekunder",
        points: 10
      },
      {
        mission:"Shotgunna en 33cl öl på 15 sekunder",
        points: 15
      },
      {
        mission:"Spring runt Dk på under 1.5 minuter",
        points: 10
      },
      {
        mission:"Ta en selfie med en främling",
        points: 5
      },
      {
        mission:"Va kassör på Ica strömmen",
        points: 10
      }];
    // Css till texten för "Lag: 1" och "10 poäng" är att de ska sitta på motsatt sida av samma rad
    // "Lag: 1" kommer alltså att sitta på vänster sida och "10 poäng" på höger sida
    // Text inputen är en placeholder tills vi har en hårdkodad lista som vi kan skicka in i en funktion för "PointInfo.tsx"
    return(
        <View
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <Text>Welcome to Pointhunt!</Text>
            <span><Text>Lag: 1 </Text><Text> 10 poäng</Text></span> 
            {PointList.map((obj, index)=> (
                <PointInfo
                key={index}
                data={obj}
                ndex={index+1}
                />
            ))}
        </View>
    );        
}