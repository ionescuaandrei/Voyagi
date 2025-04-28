import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { COLORS } from "@/constants/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { CreateTripContext } from "@/context/CreateTripContext";

const SearchPlace = () => {
  const {tripData, setTripData} = useContext(CreateTripContext) ; 
  const router = useRouter();

  useEffect(() => {
    console.log(tripData);
  },[tripData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Back</Text>
      </View>
      <Text style={styles.topContainerText}>
          ✈️ Search a destination to Travel
      </Text>
      <GooglePlacesAutocomplete
          styles={{ 
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            placeholderTextColor: styles.textPlaceholder,
            listView: styles.listView,
        }}
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            console.log(data.description);
            console.log(details?.geometry.location);
            console.log(details?.photos[0]?.photo_reference);
            console.log(details?.url)
            setTripData({
                locationInfo:{
                    name: data.description,
                    coordinates: details?.geometry.location,
                    photoRef: details?.photos[0]?.photo_reference,
                    url: details?.url,
                }
            })
            router.push('/create-trip/select-traveler');
          }}
          
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          enablePoweredByContainer= {false}
          debounce={300}
          fetchDetails={true}
        />
    </View>
  );
};

export default SearchPlace;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  topContainerText: {
    fontSize: 20,
    color: COLORS.text,
    fontFamily: "Poppins-Regular",
    marginTop: 10,
    marginHorizontal: 20,
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
  textInputContainer:{
    marginTop: 20,
    marginHorizontal:20,
  },
  textPlaceholder:{
    color: COLORS.primary,
  },
  textInput:{
    fontSize: 16,
    color: COLORS.text,
    fontFamily: "Poppins-Regular"
  },
  listView: {
    marginHorizontal: 20,
    height: '100%',
}
});
