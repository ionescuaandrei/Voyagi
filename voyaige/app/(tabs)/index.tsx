import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import HotDestinations from "../../components/hotDestinations";
import { COLORS } from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.explore}>Explore</Text>
        <AntDesign name="pluscircle" size={24} color="black" />
      </View>
      <View style={styles.bookingsContainer}>
        <TouchableOpacity
          style={styles.bookingsButton}
        >
          <Text style={styles.bookingsButtonText}>Book a Travel!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.hotDestinationsContainer}>
        <Text style={styles.hotDestinationsText}>✈️ Hot Destinations Flights</Text>
      </View>
      <HotDestinations />
      
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
  },
  explore: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    fontFamily: "Poppins-Medium",
  },
  bookingsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  bookingsButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bookingsButtonText: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: "Poppins-Bold",
  },
  hotDestinationsContainer: {
    width: "100%",
    marginHorizontal: 20,

    paddingHorizontal: 20,
  },
  hotDestinationsText:{
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    fontFamily: "Poppins-Medium",
  }
});
