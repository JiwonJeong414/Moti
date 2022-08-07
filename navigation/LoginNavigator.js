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

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  const { colorTheme } = React.useContext(RootContext);
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
              color={colorTheme.neutral}
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
              color={colorTheme.neutral}
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
    </HomeTabStack.Navigator>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "80%",
    height: "30%",
    backgroundColor: "#FFF",
  },
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderColor: "black",
    borderWidth: moderateScale(3),
    width: moderateScale(210),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});
