import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import * as Sentry from "@sentry/react-native";
import "./global.css";
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: "https://316d6e36f4187faa8dee76bb6d45110c@o4510057036840960.ingest.us.sentry.io/4510057039069184",
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  
  const [fontsLoaded, error] = useFonts({
    poppins: require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    bop: require("../assets/fonts/Birds-of-Paradise.ttf"),
    coolvetica: require("../assets/fonts/Coolvetica.otf"),
  });
  
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser()
  }, []);

  if(!fontsLoaded || isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#FFFFFF" }}}/>
  );
});
