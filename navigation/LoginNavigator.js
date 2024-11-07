import React, { useState } from "react";
import { TouchableOpacity, Platform, Animated } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import HotlineScreen from "../screens/HotlineScreen";
import { moderateScale } from "react-native-size-matters";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import TemplateColorsScreen from "../screens/TemplateColorsScreen";
import { RootContext } from "../config/RootContext";
import TextColorScreen from "../screens/TextColorScreen";
import MoodScreen from "../screens/MoodScreen";

const BottomTab = createBottomTabNavigator();

function TabIcon({ name, size, color, focused, type }) {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const opacityValue = React.useRef(new Animated.Value(0.4)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1.2,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0.4,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused, scaleValue, opacityValue]);

  const IconComponent =
    type === "MaterialIcons"
      ? MaterialIcons
      : type === "FontAwesome5"
      ? FontAwesome5
      : MaterialCommunityIcons;

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleValue }],
        opacity: opacityValue,
      }}
    >
      <IconComponent name={name} size={size} color={color} />
    </Animated.View>
  );
}

export default function BottomTabNavigator({ navigation }) {
  const { colorTheme, textTheme } = React.useContext(RootContext);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#18181b", // Dark background
          borderTopWidth: 0,
          height: moderateScale(80),
          paddingTop: moderateScale(12),
          paddingBottom:
            Platform.OS === "ios" ? moderateScale(24) : moderateScale(12),
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: -3,
              },
              shadowOpacity: 0.2,
              shadowRadius: 10,
            },
            android: {
              elevation: 8,
            },
          }),
        },
      }}
    >
      <BottomTab.Screen
        name="Mood"
        component={MoodScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              type="MaterialIcons"
              name="mood"
              size={moderateScale(28)}
              color="#fff"
              focused={focused}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              type="MaterialCommunityIcons"
              name="home"
              size={moderateScale(28)}
              color="#fff"
              focused={focused}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Hotline"
        component={HotlineScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              type="FontAwesome5"
              name="phone-alt"
              size={moderateScale(24)}
              color="#fff"
              focused={focused}
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
