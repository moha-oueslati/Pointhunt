import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Guest
export default function PointInfo({ data, ndex }: {
    data: { mission: string; points: number };
    ndex: number;
}) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.index}>{ndex}.</Text>
                <Text style={styles.mission}>{data.mission}</Text>
            </View>
            <Text style={styles.points}>{data.points} Poäng</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    index: {
        fontWeight: '700',
        width: 24,
    },
    mission: {
        flex: 1,
    },
    points: {
        marginTop: 6,
        color: '#666',
    },
});