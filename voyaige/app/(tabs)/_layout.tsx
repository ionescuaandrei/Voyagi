// Removed unused imports
import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import React from 'react'
import { COLORS } from '@/constants/theme';

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarStyle: {
                    backgroundColor: COLORS.background,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.border,
                    position: 'absolute',
                    elevation: 0,
                    height: 60,
                },
            }}>
                <Tabs.Screen
                    name="index" 
                    options={{ 
                        headerShown: false, 
                        tabBarIcon: ({size,color}: {size: number, color: string}) => <MaterialIcons name="travel-explore" size={size} color={color} />, 
                        tabBarLabel: "Explore",
                    }} 
                />
                <Tabs.Screen 
                    name="history" 
                    options={{ 
                        headerShown: false ,
                        tabBarIcon: ({size, color}: {size: number; color: string}) => <FontAwesome name="history" size={size} color={color} />,
                        tabBarLabel: "History",
                    }}/>
                <Tabs.Screen 
                    name="profile" 
                    options={{ 
                        headerShown: false ,
                        tabBarIcon: ({size, color}: {size: number; color: string}) => <FontAwesome6 name="user-shield" size={size} color={color} />,
                        tabBarLabel: "Profile",
                    }} 
                />
                
        </Tabs>
    )
}

export default TabLayout