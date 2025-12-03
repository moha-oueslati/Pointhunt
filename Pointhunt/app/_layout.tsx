import { Stack } from 'expo-router'; // HOST
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="host" options={{ headerShown: false }} />
    </Stack>
  );
}
