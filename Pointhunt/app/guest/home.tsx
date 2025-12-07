import React from 'react';
import { View, Text } from 'react-native';
import Navbar from '../components/navbar';

export default function Home() {
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Home</Text>
            </View>
            <Navbar />
        </>
    );
}