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
  TouchableWithoutFeedback,
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
import {
  MaterialCommunityIcons,
  Entypo,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import { EventRegister } from "react-native-event-listeners";
import TemplateColorsScreen from "../screens/TemplateColorsScreen";
import { BlurView } from "expo-blur";
import { RootContext } from "../config/RootContext";
import SettingsScreen from "../screens/SettingsScreen";
import Modal from "react-native-modal";

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={true}
      barStyle={{ backgroundColor: "red" }}
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
              color={color}
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
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeTabStack = createStackNavigator();

export function HomeTabNavigator({ navigation }) {
  const [settingVisible, setSettingVisible] = React.useState(false);
  const { onboarded, setOnboard } = React.useContext(RootContext);

  const chooseColorPressed = () => {
    navigation.navigate("ConfigureSettings");
    setSettingVisible(false);
  };

  const deleteUsername = async () => {
    setSettingVisible(false);
    await AsyncStorage.removeItem("Name");
    setTimeout(async () => {
      setOnboard(false);
    }, 300);
  };

  return (
    <HomeTabStack.Navigator>
      <HomeTabStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setSettingVisible(true)}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginRight: moderateScale(20),
                headerStyle: {
                  height: 80,
                },
              }}
            >
              <Entypo
                name="dots-three-horizontal"
                size={moderateScale(45)}
                color={"black"}
              />
              <Modal
                isVisible={settingVisible}
                animationIn="bounceIn"
                animationOut="bounceOut"
                onBackdropPress={() => setSettingVisible(false)}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <View
                  style={[styles.modalBackground, { flexDirection: "column" }]}
                >
                  <TouchableWithoutFeedback onPress={chooseColorPressed}>
                    <View style={styles.item}>
                      <View style={styles.itemLeft}>
                        <View style={styles.square}></View>
                        <Text style={styles.itemText}>Choose Colors</Text>
                      </View>
                      <View style={styles.circular}></View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={deleteUsername}>
                    <View style={[styles.item, { marginTop: 10 }]}>
                      <View style={styles.itemLeft}>
                        <View style={styles.square}></View>
                        <Text style={styles.itemText}>Edit Name</Text>
                      </View>
                      <View style={styles.circular}></View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback>
                    <View style={[styles.item, { marginTop: 10 }]}>
                      <View style={styles.itemLeft}>
                        <View style={styles.square}></View>
                        <Text style={styles.itemText}>Choose Template</Text>
                      </View>
                      <View style={styles.circular}></View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </Modal>
            </TouchableOpacity>
          ),
        }}
      />
      <HomeTabStack.Screen
        name="ConfigureSettings"
        component={TemplateColorsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
              <Feather
                name="x"
                size={moderateScale(30)}
                color="black"
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
