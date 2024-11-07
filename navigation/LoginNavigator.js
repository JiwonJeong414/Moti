import React, { useState } from "react";
import { TouchableOpacity, Platform, Animated, View, Text } from "react-native";
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
  }, [focused]);

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
        alignItems: "center",
        justifyContent: "center",
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
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#18181b",
          height:
            Platform.OS === "ios" ? moderateScale(100) : moderateScale(80),
          borderTopLeftRadius: moderateScale(30),
          borderTopRightRadius: moderateScale(30),
          overflow: "hidden",
          borderWidth: 0.2,
          borderColor: "#E4D5B7", //this is the duplicate
          borderBottomWidth: 0,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: -8,
              },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        tabBarActiveTintColor: "#E4D5B7",
        tabBarInactiveTintColor: "#8B8FA3",
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: "NotoSans_400Regular",
          fontSize: moderateScale(12),
          marginTop: moderateScale(-8),
          marginBottom:
            Platform.OS === "ios" ? moderateScale(8) : moderateScale(4),
        },
        tabBarItemStyle: {
          paddingTop: moderateScale(8),
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
              color={focused ? "#E4D5B7" : "#8B8FA3"}
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
              color={focused ? "#E4D5B7" : "#8B8FA3"}
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
              color={focused ? "#E4D5B7" : "#8B8FA3"}
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
            backgroundColor: "#18181b",
            borderBottomWidth: 1,
            borderBottomColor: "red", // Updated to match your theme's primary color
          },
          headerTitleStyle: {
            color: "#E4D5B7",
            fontFamily: "NotoSans_700Bold",
            fontSize: moderateScale(18),
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("HomeScreen")}
              style={{
                padding: moderateScale(8),
                marginLeft: moderateScale(12),
              }}
            >
              <Feather name="x" size={moderateScale(28)} color="#E4D5B7" />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeTabStack.Screen
        name="Text Color"
        component={TextColorScreen}
        options={{
          headerStyle: {
            backgroundColor: "#18181b",
            borderBottomWidth: 1,
            borderBottomColor: "#1C2331", // Updated to match your theme's primary color
          },
          headerTitleStyle: {
            color: "#E4D5B7",
            fontFamily: "NotoSans_700Bold",
            fontSize: moderateScale(18),
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("HomeScreen")}
              style={{
                padding: moderateScale(8),
                marginLeft: moderateScale(12),
              }}
            >
              <Feather name="x" size={moderateScale(28)} color="#E4D5B7" />
            </TouchableOpacity>
          ),
        }}
      />
    </HomeTabStack.Navigator>
  );
}
