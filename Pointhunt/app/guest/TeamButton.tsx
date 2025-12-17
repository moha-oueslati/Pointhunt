import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';

// Guest
export default function TeamButton({index, change, topnum}:{index: number, change:(value: number) => void, topnum: number}){
    return(
        <>
        {index !== topnum ? ( 
                <TouchableOpacity style={styles.dropdownItem}
                onPress={() => {change(index)}}> 
                <Text style={styles.dropdownText}>Lag {index}</Text>
                </TouchableOpacity>
            ):
            (
                <TouchableOpacity style={styles.dropdownItem}
                onPress={() => {change(0)}}>
                    <Text style={styles.dropdownText}>Välj Lag</Text>
                </TouchableOpacity>
            )
        }
        </>
        
    );

}

const styles = StyleSheet.create({
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#FFEBAF',
        borderRadius: 15,
        marginBottom: 5,
      },
      dropdownText: {
        color: "#B89DFF",
        fontSize: 18,
        fontWeight: "bold",
      }
});