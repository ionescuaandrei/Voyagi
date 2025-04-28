import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'; // Import Alert
import React, { useState, useContext, useEffect } from 'react'; // Import useEffect
import CalendarPicker from "react-native-calendar-picker";
import { useRouter } from 'expo-router';
import { CreateTripContext } from '@/context/CreateTripContext';
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment'; 

const SelectDate = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null); 
    const router = useRouter();
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(() => {
        if (startDate) { // This condition ensures updates happen only after a start date is picked
            setTripData(prevTripData => ({
                ...prevTripData,
                startDate: moment(startDate).format('YYYY-MM-DD'),
                // endDate is updated here using the current local endDate state
                endDate: moment(endDate).format('YYYY-MM-DD')
            }));
        }
        // This effect runs whenever local startDate or local endDate changes.
    }, [startDate, endDate]);


    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
            setEndDate(date);
        } else {
            setStartDate(date);
            setEndDate(null);
        }
    };

    const handleNext = () => {
        if (!startDate || !endDate) {
            Alert.alert("Invalid Selection", "Please select both a start and end date.");
        } else {
            console.log("Selected Dates:", tripData.startDate, tripData.endDate);
            Alert.alert("Dates Selected", `Start: ${tripData.startDate}\nEnd: ${tripData.endDate}`);
            // router.push('/create-trip/next-step'); // <-- Replace with your next route
        }
    };

    const minDate = new Date(); 
    const maxDate = new Date(2026, 6, 3); 
    const selectedStartDate = startDate ? startDate.toString() : '';
    const selectedEndDate = endDate ? endDate.toString() : '';


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Select Dates</Text>
            </View>
            <View style={styles.datePickerContainer}>
                <Text style={styles.titlePicker}>Select Departure & Arrival Date</Text>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true} 
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor={COLORS.lightGray} 
                    selectedDayColor={COLORS.primary} 
                    selectedDayTextColor={COLORS.white} 
                    onDateChange={onDateChange}
                    width={350} 
                    height={400}
                    textStyle={{
                        fontFamily: 'Poppins-Regular',
                        color: COLORS.text,
                    }}
                    previousTitle="<"
                    nextTitle=">"
                />
                <View style={styles.selectedDateContainer}>
                    <Text style={styles.selectedDateLabel}>Departure:</Text>
                    <Text style={styles.selectedDateValue}>{selectedStartDate ? moment(selectedStartDate).format('ddd, MMM D, YYYY') : 'Not Selected'}</Text>
                </View>
                 <View style={styles.selectedDateContainer}>
                    <Text style={styles.selectedDateLabel}>Arrival:</Text>
                    <Text style={styles.selectedDateValue}>{selectedEndDate ? moment(selectedEndDate).format('ddd, MMM D, YYYY') : 'Not Selected'}</Text>
                </View>
            </View>
             <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SelectDate;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: COLORS.background,
        paddingBottom: 80, // Add padding to avoid overlap with button
    },
    // ...existing header styles...
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
      datePickerContainer: {
        marginTop: 10, // Reduced margin
        marginHorizontal: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align items to start
        flexDirection: 'column',
        gap: 15, // Reduced gap
      },
      titlePicker: {
        fontSize: 20,
        color: COLORS.primary,
        fontFamily: "Poppins-Medium",
        // Removed marginTop and marginHorizontal as it's handled by container
        textAlign: 'center', // Center title
        marginBottom: 10, // Add some space below title
      },
      selectedDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%', // Adjust width as needed
        marginTop: 5,
        paddingHorizontal: 10,
      },
      selectedDateLabel: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: COLORS.text,
      },
      selectedDateValue: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: COLORS.primary, // Use primary color for selected date text
      },
      nextButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
      nextButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
      },
      // Remove old selectedDate style if no longer needed
      // selectedDate: {
      //   marginTop: 16,
      //   fontSize: 16,
      //   color: 'blue',
      // },
});