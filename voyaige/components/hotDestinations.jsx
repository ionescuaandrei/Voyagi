import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const cardWidth = screenWidth - 40; 

const amadeusToken = process.env.EXPO_PUBLIC_AMADEUS_TOKEN;

const HotDestinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDestinations = async () => {

        if (!amadeusToken) {
            console.error('Error: EXPO_PUBLIC_AMADEUS_TOKEN is not set in .env');
            setError('API token is missing. Please configure it in the environment variables.');
            setLoading(false);
            Alert.alert("Configuration Error", "Amadeus API token is not configured.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${amadeusToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error Response:', response.status, errorData);
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            // console.log('Fetched Destinations:', data.data);
            setDestinations(data.data || []);
        } catch (err) {
            console.error('Error fetching destinations:', err);
            setError(err.message || 'Failed to fetch destinations. Please try again.');
            setDestinations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);


    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.destination}>{item.destination}</Text>
            <Text style={styles.price}>Price: {item.price?.total ? `${item.price.total} €` : 'N/A'}</Text>
            <Text style={styles.departureDate}>Departure: {item.departureDate || 'N/A'}</Text>
            <Text style={styles.returnDate}>Return: {item.returnDate || 'N/A'}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={[styles.outerContainer, styles.centerContent]}>
                 <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        );
    }

    if (error) {
        // ... (error state remains the same)
        return (
            <View style={[styles.outerContainer, styles.centerContent]}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

     if (!destinations || destinations.length === 0) {
        // Handle case with no destinations found
         return (
          <View style={[styles.outerContainer, styles.centerContent]}>
            <Text>No hot destinations found.</Text>
          </View>
        );
      }


    return (
        // Use outerContainer for margins
        <View style={styles.outerContainer}>
            <FlatList
                horizontal={true}
                pagingEnabled={true} // Paging will now snap based on the FlatList width within the margins
                showsHorizontalScrollIndicator={false} // Usually better with paging
                data={destinations}
                keyExtractor={(item, index) => `${item.destination}-${item.departureDate}-${index}`}
                renderItem={renderItem}
                // Ensure FlatList itself doesn't have conflicting styles
                style={styles.flatList} // Added style for FlatList if needed
            />
        </View>
    );
}

export default HotDestinations

const styles = StyleSheet.create({
    outerContainer: { // Renamed container to outerContainer for clarity
        marginHorizontal: 20, // Apply margin here
        // Set height or flex as needed for the component area
    },
    flatList: {
        // FlatList takes the width available within outerContainer
        // No specific width needed here unless for specific layout reasons
    },
    centerContent: { 
        flex: 1,
        marginTop: 20,
    },
    card: {
        width: cardWidth, 
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    destination: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#4F46E5',
        marginBottom: 6,
    },
    departureDate: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#4B5563',
        marginBottom: 2,
    },
    returnDate: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#4B5563',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    }
});