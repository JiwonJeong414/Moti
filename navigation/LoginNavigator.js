import React, { useState, useEffect, createContext, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import HotlineScreen from "../screens/HotlineScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";
import {
  MaterialCommunityIcons,
  Entypo,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import TemplateColorsScreen from "../screens/TemplateColorsScreen";
import { RootContext } from "../config/RootContext";
import Modal from "react-native-modal";
import TextColorScreen from "../screens/TextColorScreen";

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  const { colorTheme, textTheme } = React.useContext(RootContext);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={true}
      barStyle={{ backgroundColor: colorTheme.accents }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="home"
              size={moderateScale(20)}
              color={textTheme.text}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Hotline"
        component={HotlineScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5
              name="phone-alt"
              size={moderateScale(20)}
              color={textTheme.text}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeTabStack = createStackNavigator();

export function HomeTabNavigator({ navigation }) {
  const { colorTheme } = React.useContext(RootContext);
  const { onboarded, setOnboard } = React.useContext(RootContext);
  const [settingVisible, setSettingVisible] = useState(false);

  return (
    <HomeTabStack.Navigator screenOptions={{ headerMode: "screen" }}>
      <HomeTabStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeTabStack.Screen
        name="Choose Colors"
        component={TemplateColorsScreen}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
              <Feather
                name="x"
                size={moderateScale(30)}
                color="white"
                style={{ marginLeft: moderateScale(20) }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeTabStack.Screen
        name="Text Color"
        component={TextColorScreen}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
              <Feather
                name="x"
                size={moderateScale(30)}
                color="white"
                style={{ marginLeft: moderateScale(20) }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </HomeTabStack.Navigator>
  );
}
