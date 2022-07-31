import React, { useState, useEffect, createContext, useContext } from "react";
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
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import HotlineScreen from "../screens/HotlineScreen";
import LoadingScreen from "../screens/LoadingScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colorsContext from "../config/colorsContext";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import colors from "../config/colors";
import neutralContext from "../config/neutralContext";
import neutral from "../config/neutral";
import { MaterialCommunityIcons, Entypo, Feather } from "@expo/vector-icons";
import { EventRegister } from "react-native-event-listeners";
import TemplateColors from "../Components/TemplateColors";
import { BlurView } from "expo-blur";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { position: "absolute" },
        tabBarBackground: () => <View style={[StyleSheet.absoluteFill]} />,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          title: "Home",
          headerShown: false,
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Hotline"
        component={HotlineScreen}
        options={{
          title: "Hotline",
          headerShown: false,
          tabBarActiveTintColor: "red",
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeTabStack = createStackNavigator();

export function HomeTabNavigator({ navigation }) {
  const settingsPressed = () => {
    navigation.navigate("ConfigureSettings");
  };

  return (
    <HomeTabStack.Navigator mode="modal">
      <HomeTabStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={settingsPressed}>
              <Entypo
                name="dots-three-horizontal"
                size={moderateScale(45)}
                color={"black"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeTabStack.Screen
        name="ConfigureSettings"
        component={TemplateColors}
        options={{
          headerLeft: () => {
            <Feather
              name="x"
              size={moderateScale(22)}
              onPress={() => navigation.navigate("HomeScreen")}
              color="black"
              style={{ marginLeft: moderateScale(30) }}
            />;
          },
        }}
      />
    </HomeTabStack.Navigator>
  );
}
