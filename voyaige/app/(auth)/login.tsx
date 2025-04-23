import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { COLORS } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSSO, useAuth } from '@clerk/clerk-expo';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Login() {
  const { startSSOFlow } = useSSO();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (isSignedIn) {
      router.replace('/(tabs)'); 
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: 'oauth_google' });
      if (setActive && createdSessionId) {
        // Set the active session correctly
        await setActive({ session: createdSessionId });
        router.replace('/(tabs)');
      } else {
        console.log("Google sign-in flow did not result in an active session.");
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      // Avoid showing generic alert for specific known issues like cancellation
      if (!error.message?.includes('cancelled')) {
         Alert.alert('Sign-in Error', 'An error occurred while signing in with Google. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

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
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#4285F4" style={styles.googleIcon} />
            ) : (
              <AntDesign name="google" size={20} style={styles.googleIcon} />
            )}
            <Text style={styles.googleButtonText}>
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </Text>
          </TouchableOpacity>
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
    display: 'flex',
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
    color: '#4285F4',
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