import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TeamButton from './TeamButton';
import Navbar from './navbar';


// Guest 
export default function TaskInterface(){
    const [open, setOpen] = useState(false);
    const [num, setSwaped] = useState(0);

    const toggleDropDown = () => {
        setOpen((open) => !open);
    };
    const handleChange = (num2: number) => {
        setSwaped(num2);
        setOpen(false);
    };
    const getTitle = (num: number) => {
            switch(num){
                case 1:
                    return "Lag 1";
                case 2:
                    return "Lag 2";
                default:
                    return "Välj Lag";
            }
        };
    return(
        <>
            <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
            >
                <Text style={{
                    fontSize: 44,
                    fontWeight: 'bold'
                }}
                >Uppgift 1: </Text>
                <Text>Stå på händerna i 10 sekunder</Text>
            </View>
            <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
            >
                <TouchableOpacity onPress={() => {toggleDropDown()}} key={num}>
                    <Text>{getTitle(num)}</Text>
                </TouchableOpacity>
                {open &&(
                    <View>
                        <TeamButton 
                        key={1}
                        index={1}
                        change={handleChange}
                        topnum={num}
                        />
                        <TeamButton 
                        key={2}
                        index={2}
                        change={handleChange}
                        topnum={num}
                        />
                    </View>
                )}
            </View>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
            >
                <input type="file" />
            </View>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 30
                }}>Beskrivning</Text>
                <input type="
                text" />
            </View>
            <View style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end"
            }}>
                <TouchableOpacity><Text>Skicka</Text></TouchableOpacity>
            </View>
            <View>
                <Navbar />
            </View>
        </>
        
    );
}