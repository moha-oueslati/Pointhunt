import { Stack } from 'expo-router'; // HOST

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="host" options={{ headerShown: false }} />
      
    </Stack>
  );
}