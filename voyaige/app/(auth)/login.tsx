import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../../firebaseConfig';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';
import { COLORS } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  // Fixed the clientId formatting by removing trailing space
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '595275012778-mggnc8so5cb72k99fafvmk714qm2anaf.apps.googleusercontent.com',
    webClientId: '595275012778-mggnc8so5cb72k99fafvmk714qm2anaf.apps.googleusercontent.com',
    androidClientId: '595275012778-mggnc8so5cb72k99fafvmk714qm2anaf.apps.googleusercontent.com',
    iosClientId: '595275012778-mggnc8so5cb72k99fafvmk714qm2anaf.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setIsLoading(true);
      
      try {
        // Improved token extraction with proper error handling
        const { authentication } = response;
        if (!authentication) {
          throw new Error('Authentication data is missing');
        }
        
        // Handle different token property names that Google might return
        const idToken = authentication.idToken || authentication.id_token;
        if (!idToken) {
          throw new Error('ID token is missing from authentication response');
        }
        
        const credential = GoogleAuthProvider.credential(idToken);
        
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            // User successfully signed in
            console.log("User signed in:", userCredential.user.displayName);
            router.replace('/(tabs)'); // Navigate to your app's main screen
          })
          .catch((error) => {
            console.error("Error signing in:", error);
            Alert.alert("Login Failed", "There was an error signing in with Google. Please try again.");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.error("Error processing authentication:", error);
        Alert.alert("Authentication Error", "Failed to process authentication data. Please try again.");
        setIsLoading(false);
      }
    }
  }, [response]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await promptAsync();
    } catch (error) {
      console.error("Error during Google sign-in prompt:", error);
      Alert.alert("Error", "Failed to open Google sign-in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Sign In</Text>
      </View>
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('@/assets/images/Untitled.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.subText}>Sign in to continue your journey</Text>
      </View>

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={!request}
          >
            <Image 
              source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'}} 
              style={styles.googleIcon}
              resizeMode="contain"
            />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing in, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    marginLeft: 15,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    color: COLORS.border,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#4285F4',
  },
  footer: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: COLORS.border,
  },
  link: {
    color: COLORS.primary,
    fontFamily: 'Poppins-Medium',
  },
});