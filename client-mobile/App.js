import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MainPage from './screens/MainPage';
import AboutPage from './screens/About';
import { ApolloProvider } from "@apollo/client";
import client from "./config";
// import { routerKey } from 'vue-router';

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={MyTheme} >
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "home"
                : "home-outline";
            } else if (route.name === "About") {
              iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })} >
          <Tab.Screen name='Home' component={MainPage} />
          <Tab.Screen name='About' component={AboutPage} />

        </Tab.Navigator>
      </NavigationContainer >
    </ApolloProvider>
  );
}
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};
