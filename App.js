import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import HotlineScreen from "./screens/HotlineScreen";

const Stack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomStack.Navigator>
        <BottomStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home", headerShown: false }}
        />
        <BottomStack.Screen name="Hotline" component={HotlineScreen} />
      </BottomStack.Navigator>
    </NavigationContainer>
  );
}
