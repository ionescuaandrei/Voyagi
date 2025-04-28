import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from 'react'
import { COLORS } from "@/constants/theme";
import { useRouter } from 'expo-router';
import { CreateTripContext } from '@/context/CreateTripContext';
import { useEffect } from 'react';

const SelectTraveler = () => {

  const router = useRouter();

  const { tripData, setTripData } = useContext(CreateTripContext);

  const [numberDataAdult, setNumberDataAdult] = useState(0);
  const [numberDataChild, setNumberDataChild] = useState(0);

  useEffect(() => {
    setTripData(prevTripData => ({
      ...prevTripData,
      numberOfAdult: numberDataAdult,
      numberOfChild: numberDataChild,
    }));
  },[numberDataAdult, numberDataChild]);

  const handleNext = () => {
    if (numberDataAdult === 0 && numberDataChild === 0) {
      Alert.alert("Invalid Selection", "Please select at least one adult or child.");
    } else {
      router.push('/create-trip/select-date');
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Back</Text>
        </View>
      <Text style={styles.topContainerText}>
      🙋‍♂️ Choose who's travelling
      </Text>
      <View style={styles.chooseTravelerContainer}>
        <View style={styles.chooseTravelerWrapper}>
            <Text style={styles.chooseTraveler}>
              Adults:
            </Text>
            <Text style={{fontSize: 16, color: COLORS.text, fontFamily: "Poppins-Medium"}}>
              {numberDataAdult}
            </Text>
            <TouchableOpacity style={styles.plus}
              onPress={()=> {
                setNumberDataAdult(numberDataAdult + 1);
              }}
            >
              <Text style={{color: COLORS.background}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.plus}
              onPress={()=> {
                if(numberDataAdult > 0){
                setNumberDataAdult(numberDataAdult - 1);}
              }}
            >
              <Text style={{color: COLORS.background}}>-</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.chooseTravelerWrapper}>
            <Text style={styles.chooseTraveler}>
              Children:
            </Text>
            <Text style={{fontSize: 16, color: COLORS.text, fontFamily: "Poppins-Medium"}}>
              {numberDataChild}
            </Text>
            <TouchableOpacity style={styles.plus}
              onPress={()=> {
                setNumberDataChild(numberDataChild + 1);
              }}
            >
              <Text style={{color: COLORS.background}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.plus}

              onPress={()=> {
                if(numberDataChild > 0){
                  setNumberDataChild(numberDataChild - 1);
                };
              }}
            >
              <Text style={{color: COLORS.background}}>-</Text>
            </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.next}
        onPress={handleNext} // Use the new handler
      >
          <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectTraveler

const styles = StyleSheet.create({
  container:{
    position: "relative",
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    fontFamily: "Poppins-Medium",
  },
  topContainerText:{
    fontSize: 20,
    color: COLORS.text,
    fontFamily: "Poppins-Regular",
    marginTop: 10,
    marginHorizontal: 20,
  },
  chooseTravelerContainer:{
    marginTop: 20,
    marginHorizontal: 20,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  chooseTravelerWrapper:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  chooseTraveler:{
    fontSize: 18,
    color: COLORS.text,
    fontFamily: "Poppins-Medium",
  },
  plus:{
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: 50, // Ensures the button is fully rounded
    color: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, // Ensures a consistent width
    height: 40, // Ensures a consistent height
  },
  next:{
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 50, // Ensures the button is fully rounded
    color: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText:{
    color: COLORS.background,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  }
});