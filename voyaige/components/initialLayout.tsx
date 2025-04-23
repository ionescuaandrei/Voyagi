import { useAuth } from "@clerk/clerk-expo"
import { isLoaded } from "expo-font"
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Stack } from "expo-router";

const InitialLayout = () => {
  const {isLoaded,isSignedIn} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if(!isLoaded) return
    const isAuthScreen = segments[0] === "(auth)";

    if(!isAuthScreen && !isSignedIn){
      router.replace("/(auth)/start");
    }else if(isAuthScreen && isSignedIn){
      router.replace("/(tabs)");
    }
  },[isLoaded,isSignedIn])

  if(!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />
  
}




export default InitialLayout

