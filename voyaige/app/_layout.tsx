import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";


export default function RootLayout() {
  useFonts({
  'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
  'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
  'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
  'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
  'Poppins-BlackItalic': require('../assets/fonts/Poppins-BlackItalic.ttf'),
  'Poppins-BoldItalic': require('../assets/fonts/Poppins-BoldItalic.ttf'),
  'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
  'Poppins-LightItalic': require('../assets/fonts/Poppins-LightItalic.ttf'),
});
  return (
    <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
          <Stack screenOptions={{ headerShown: false }}/> 
        </SafeAreaView>
      </SafeAreaProvider>
  );
}
