import React from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';

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
            <Text style={{ marginBottom: 12 }}>{docId ? `Room: ${docId}` : 'No room code'}</Text>
            <Button title="Starta spelet" onPress={handlePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});