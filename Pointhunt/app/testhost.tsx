import React from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function TestHost() {
    const { code } = useLocalSearchParams<{ code?: string | string[] }>();
    const docId = code ? (Array.isArray(code) ? code[0] : code) : undefined;

    const handlePress = async () => {   
        if (!docId) {
            Alert.alert('Missing code', 'No room code available — pass ?code=<roomId>');
            return;
        }

        try {
            const roomRef = doc(db, 'codes', docId);
            await updateDoc(roomRef, { gameStarted: true });
            
        } catch (err) {
            console.error('Failed to start game:', err);
            Alert.alert('Error', 'Failed to start game — see console for details');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 12 }}>{docId ? `Room: ${docId}` : 'No room code'}</Text>
            <Button title="Start game" onPress={handlePress} />
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