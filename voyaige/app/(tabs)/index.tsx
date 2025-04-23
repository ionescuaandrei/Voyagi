import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

const index = () => {
  const { user } = useUser()
  return (
    <View>
      <Text>{user?.fullName}</Text>
      <Text>{user?.emailAddresses[0].emailAddress}</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})