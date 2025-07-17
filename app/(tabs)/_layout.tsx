import React from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Home, BookOpen, Bell, Users, MoreHorizontal } from 'lucide-react-native';
import { AppContextProvider } from '@/context/AppContext';

export default function TabLayout() {
  return (
    <AppContextProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
            height: 90,
            paddingBottom: 20,
            paddingTop: 10,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarActiveTintColor: '#0ea5e9',
          tabBarInactiveTintColor: '#737373',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginBottom: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Home size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="resources"
          options={{
            title: 'Resources',
            tabBarIcon: ({ color, size }) => (
              <BookOpen size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="reminders"
          options={{
            title: 'Reminders',
            tabBarIcon: ({ color, size }) => (
              <Bell size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: 'Progress',
            tabBarIcon: ({ color, size }) => (
              <Users size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            tabBarIcon: ({ color, size }) => (
              <MoreHorizontal size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
      </Tabs>
    </AppContextProvider>
  );
}