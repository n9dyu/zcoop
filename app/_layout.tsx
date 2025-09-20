import { SplashScreen, Stack, withLayoutContext } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from "react";

import './global.css'

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "poppins": require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    "bop": require('../assets/fonts/Birds-of-Paradise.ttf'),
    "coolvetica": require('../assets/fonts/Coolvetica.otf')
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return (
  <Stack
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: "#FFFFFF" }, // 👈 background color here
    }}
  />
);
}
