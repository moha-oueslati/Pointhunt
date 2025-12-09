import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function TestHost() {
    const { code } = useLocalSearchParams<{ code?: string}>();
    const docId = code;

    const handlePress = async () => {   
        if (!docId) {
        Alert.alert('Ingen kod');
            return;
        }

        try {
            const roomRef = doc(db, 'codes', docId);
            await updateDoc(roomRef, { gameStarted: true });
            
        } catch (err) {
            console.error('Failed to start game', err);
            Alert.alert('Kunde inte starta spelet, kolla firebase write rules');
        }
    };

    return (
        <View style={styles.container}>

        <Text style={styles.codeTitle}>Rumskod</Text>
        <Text style={styles.roomCode}>{docId ? `Room: ${docId}` : 'No room code'}</Text>
        <TouchableOpacity style={styles.startButton} onPress={handlePress}>
        <Text style={styles.startButtonText}>Starta spelet </Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#AEDDFF",
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#1A2553",
        marginBottom: 30,
    },
    codeTitle: {
        fontSize: 28,
        color: "#1A2553",
        marginBottom: 6,
        fontWeight: "bold",
    },
    roomCode: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#B89DFF",
        paddingBottom: 20,
    },

    startButton: {
        backgroundColor: "#FFDE7D",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },

    startButtonText: {
        fontSize: 22,
        color: "#B89DFF",
        fontWeight: "bold",
    },
});