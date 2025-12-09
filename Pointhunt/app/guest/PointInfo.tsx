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
                <Text style={styles.points}>{data.points} Poäng</Text>
            </View>
        <Text style={styles.index}>{ndex}. {data.mission}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 3,
    },
    index: {
        fontSize: 16,
        color: "#000",

    },
    points: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#FFDE7D",
        marginBottom: 10,
      },
});