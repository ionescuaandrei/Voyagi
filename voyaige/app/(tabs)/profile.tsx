import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { COLORS } from '@/constants/theme';
import { useRouter } from 'expo-router';

const profile = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
        source={{ uri: user?.imageUrl }}
        style={{
          width: 70,
          height: 70,
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          borderWidth: 1,
          borderColor: COLORS.white,
        }}
        />
        <View style={styles.topTextContainer}>
          <Text style={styles.welcome}>Welcome back</Text>
          <Text style={styles.welcomeName}>{user?.fullName}</Text>
        </View>
      </View>
      <View style={styles.bookingsContainer}>
        <TouchableOpacity style={styles.bookingsButton}
          onPress={() => {
            router.push('/(tabs)')
          }}
          >
          <Text style={styles.bookingsButtonText}>Book a Travel!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lastTripContainer}>
        <Text style={styles.lastTripText}>My Last Trip</Text>
        <View style={styles.lastTripBox}>
          <Image
            source={{ uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=1400&h=1400&s=1' }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}/>
            <View style={styles.lastTripBoxTextes}>
              <Text style={styles.lastTripBoxTitle}>Trip to Paris</Text>
              <Text style={styles.lastTripBoxText}>Date: 20th March 2023</Text>
              <Text style={styles.lastTripBoxText}>Duration: 5 days</Text>
              <Text style={styles.lastTripBoxStatus}>Status: Completed</Text>
            </View>
        </View>
      </View>

      {/* <View style={styles.signOut}>
        
      </View> */}
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
    container:{
      position: 'relative',
      flex: 1,
      backgroundColor: COLORS.background,
    },
    topContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: '100%',
        height: 100,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    topTextContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    welcome:{
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white,
        fontFamily: 'Poppins-Medium',
    },
    welcomeName:{
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.border,
        fontFamily: 'Poppins-LightItalic',
    },
    bookingsContainer:{
      marginTop: 20,
      paddingHorizontal: 20,
    },
    bookingsButton:{
      backgroundColor: COLORS.accent,
      paddingVertical: 15,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookingsButtonText:{
      fontSize: 15,
      color: COLORS.white,
      fontFamily: 'Poppins-Bold',
    },
    lastTripContainer:{
      marginTop: 20,
      paddingHorizontal: 20,
    },
    lastTripText:{
      marginBottom: 10,
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
      fontFamily: 'Poppins-Medium',
    },
    lastTripBox:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: COLORS.white,
      padding: 20,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    lastTripBoxTextes:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    lastTripBoxTitle:{
      fontSize: 15,
      fontWeight: 'bold',
      color: COLORS.text,
      fontFamily: 'Poppins-Medium',
    },
    lastTripBoxText:{
      fontSize: 12,
      color: COLORS.text,
      fontFamily: 'Poppins-Light',
    },
    lastTripBoxStatus:{
      fontSize: 12,
      padding: 5,
      borderRadius: 5,
      color: '#4CAF50',
      fontFamily: 'Poppins-Medium',
      backgroundColor: '#E8F5E9',
    },

})