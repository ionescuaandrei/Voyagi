import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/theme'
import { router } from 'expo-router'
import { useRoute } from '@react-navigation/native'

const start = () => {
  return (
    <View style={styles.container}>
        <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome to 
                <Text style={styles.appName}> Voyagi</Text>
            </Text>
            <Text style={styles.description}>
                Find your perfect holiday within minutes
            </Text>
        </View>
        <View style={styles.logo}>
            <Image 
                source={require('@/assets/images/Untitled.png')} 
                style={{ width: 500, height:140 }} 
                resizeMode="contain" 
            />
        </View>
        <View style={styles.appDescription}>
            <Text style={styles.appDescriptionText}>
            Smarter trips, unforgettable memories.
            </Text>
        </View>
        <View style={styles.getStarted}>
            <TouchableOpacity style={styles.button}
            onPress={() => router.push('/(auth)/login')}
            >
                <Text style={styles.buttonText}>
                    Get Started
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default start

const styles = StyleSheet.create({
    container:{
        position: 'relative',
        flex: 1,
        backgroundColor: COLORS.background,
    },
    welcomeContainer:{
        marginTop: 100,
    },
    welcome:{
        fontSize: 35,
        color: COLORS.text,
        textAlign: 'center',
        fontFamily: 'Poppins-Light',
        },
    appName:{
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        color: COLORS.primary,
    },
    description:{
        fontSize: 16,
        color: COLORS.border,
        textAlign: 'center',
        fontFamily: 'Poppins-Light',
        marginTop: 10,
    },
    logo:{
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    getStarted:{
        marginHorizontal: 20,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appDescription:{
        width: 300,
        marginHorizontal: 'auto',
    },
    appDescriptionText:{
        textAlign: 'center',
        color: COLORS.accent,
        fontFamily: 'Poppins-LightItalic',
    },
    button:{
        backgroundColor: COLORS.primary,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 5,
    },
    buttonText:{
        color: COLORS.background,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    }
})