import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { COLORS } from '@/constants/theme'

const profile = () => {
  const { user } = useUser()
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image 
        source={{ uri: user?.imageUrl }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginBottom: 10,
        }}
        />
        <View>
          <Text>Welcome back,</Text>
          <Text>{user?.fullName}</Text>
        </View>
      </View>
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
        height: 200,
        backgroundColor: COLORS.primary,
    },
})