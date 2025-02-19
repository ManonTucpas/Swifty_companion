import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { StudentProvider } from '@/context/StudentContext';
import styles from '@/styles/styles';
import { Image } from 'expo-image'

const TabLayout = () => {
    const colorScheme = useColorScheme();

    return (
        <StudentProvider>
                    <View style={stylesLayout.header}>
                        <Image
                            source={require('../src/assets/images/assembly_background.jpg')}
                            style={stylesLayout.image}
                        />
                        <View style={stylesLayout.textOverlay}>
                            <Text style={[styles.title, { color: "white" }]} selectionColor={'white'}>Swifty Companion</Text>
                        </View>
                    </View>
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                        headerShown: false,
                        tabBarButton: HapticTab,
                        tabBarStyle: Platform.select({
                            ios: {
                                // Use a transparent background on iOS to show the blur effect
                                position: 'absolute',
                            },
                            default: {},
                        }),
                    }}>
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: "Home",
                            tabBarIcon: ({ color }) => (
                                <Feather name="home" size={24} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="profile"
                        options={{
                            title: "Profile",
                            tabBarIcon: ({ color }) => (
                                <Feather name="user" size={24} color={color} />
                            ),
                        }}
                    />
                </Tabs>
        </StudentProvider>

    );
}

const stylesLayout = StyleSheet.create({

    header: {
        width: "100%",
        height: 100,
        backgroundColor: '#eef2f3', // Fallback background for the header
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20, // Adds a rounded edge to the header
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        margin: 16,
        padding: 12,
        backgroundColor: '#ffffff', // White card-like background
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    textOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default TabLayout;