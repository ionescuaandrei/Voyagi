import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import InitialLayout from "../components/initialLayout";
import { ActivityIndicator, View, Text } from "react-native"; // Added Text for error handling
import 'react-native-get-random-values';

// 1. Import your context provider
import { CreateTripContext } from '../context/CreateTripContext'; // Adjust the path as needed
import { useState } from "react";

export default function RootLayout() {
  const [tripData,setTripData] = useState([]);
  // useFonts returns a boolean indicating if fonts are loaded and an error object
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-BlackItalic": require("../assets/fonts/Poppins-BlackItalic.ttf"),
    "Poppins-BoldItalic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-LightItalic": require("../assets/fonts/Poppins-LightItalic.ttf"),
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env");
  }

  // Show a loading indicator while fonts are loading
  if (!fontsLoaded && !fontError) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
    );
  }

  // Optional: Handle font loading error
  if (fontError) {
      console.error("Font loading error:", fontError);
      // Render an error message or fallback UI
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Error loading fonts. Please restart the app.</Text>
        </View>
      );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <CreateTripContext.Provider value={{tripData,setTripData}}>
          <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <InitialLayout />
          </SafeAreaView>
          </SafeAreaProvider>
        </CreateTripContext.Provider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}