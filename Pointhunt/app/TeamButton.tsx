import { Text, TouchableOpacity } from 'react-native'

// Guest
export default function TeamButton({index, change, topnum}:{index: number, change:(value: number) => void, topnum: number}){
    return(
        <>
        {index !== topnum ? ( 
                <TouchableOpacity onPress={() => {change(index)}}> 
                <Text>Lag {index}</Text>
                </TouchableOpacity>
            ):
            (
                <TouchableOpacity onPress={() => {change(0)}}>
                    <Text>Välj Lag</Text>
                </TouchableOpacity>
            )
        }
        </>
        
    );

}