// app/host/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function HostLayout() {
  return (
    <Stack>
      <Stack.Screen name="host" options={{ headerShown: false }} />
      <Stack.Screen name="tasks" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="submissions" options={{ headerShown: false }} /> 
    </Stack>
  );
}