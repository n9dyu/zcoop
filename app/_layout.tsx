import { SplashScreen, Stack, withLayoutContext } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import * as Sentry from '@sentry/react-native';
import './global.css'

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "poppins": require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    "bop": require('../assets/fonts/Birds-of-Paradise.ttf'),
    "coolvetica": require('../assets/fonts/Coolvetica.otf')
  });


Sentry.init({
  dsn: 'https://316d6e36f4187faa8dee76bb6d45110c@o4510057036840960.ingest.us.sentry.io/4510057039069184',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
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
});