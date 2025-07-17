import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppContextProvider } from '@/context/AppContext';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

const customTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: theme.colors.primary,
    accent: theme.colors.accent,
    background: theme.colors.background,
    surface: theme.colors.surface,
    // Do NOT add 'text' or other non-MD2 keys here!
  },
};

import HomeScreen from './index';
import ResourcesScreen from './resources';
import RemindersScreen from './reminders';
import ProgressScreen from './progress';
import ClubsScreen from '../more-screens/clubs';
import MoreScreen from './more';
import LostFoundScreen from '../more-screens/lost-found';
import ComplaintsScreen from '../more-screens/complaints';
import JobsScreen from '../more-screens/jobs';

const Tab = createMaterialBottomTabNavigator();

export default function TabLayout() {
  return (
    <AppContextProvider>
      <PaperProvider theme={customTheme}>
        <Tab.Navigator
          shifting={false} // disable shifting style
          activeColor={theme.colors.onPrimary}
          inactiveColor={theme.colors.onSurfaceVariant}
          barStyle={{
            backgroundColor: theme.colors.primary,
            height: 90,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
            tabBarIconStyle: { marginTop: 4 },
          }}
        >
          <Tab.Screen
            name="index"
            component={HomeScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialIcons name="home" size={30} color={color} />
              ),
              tabBarColor: theme.colors.primary,
              tabBarActiveBackgroundColor: 'transparent',
            }}
          />
          <Tab.Screen
            name="resources"
            component={ResourcesScreen}
            options={{
              title: 'Resources',
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialIcons name="library-books" size={30} color={color} />
              ),
              tabBarColor: theme.colors.primary,
              tabBarActiveBackgroundColor: 'transparent',
            }}
          />
          <Tab.Screen
            name="reminders"
            component={RemindersScreen}
            options={{
              title: 'Reminders',
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialIcons name="alarm" size={30} color={color} />
              ),
              tabBarColor: theme.colors.primary,
              tabBarActiveBackgroundColor: 'transparent',
            }}
          />
          <Tab.Screen
            name="clubs"
            component={ClubsScreen}
            options={{
              title: 'Clubs',
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialIcons name="group" size={26} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="more"
            component={MoreScreen}
            options={{
              title: 'More',
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialIcons name="more-horiz" size={30} color={color} />
              ),
              tabBarColor: theme.colors.primary,
              tabBarActiveBackgroundColor: 'transparent',
            }}
          />
        </Tab.Navigator>
      </PaperProvider>
    </AppContextProvider>
  );
}
