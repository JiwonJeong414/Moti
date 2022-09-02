import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Todo from "../Components/Todo";
import CustomDatePicker from "../Components/CustomDatePicker";
import Quotes from "../Components/Quotes";
import BannerAndIcon from "../Components/BannerAndIcon";
import { RootContext } from "../config/RootContext";
import { moderateScale } from "react-native-size-matters";
import Habits from "../Components/Habits";
import SettingModal from "../Components/SettingModal";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";

const HomeScreen = ({ navigation, route }) => {
  const [myName, setMyName] = useState();
  const { onboarded, colorTheme, textTheme } = React.useContext(RootContext);

  const fullHeight = Dimensions.get("window").height;

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    const getName = async () => {
      let userName = await AsyncStorage.getItem("Name");
      userName = JSON.parse(userName);
      setMyName(userName);
    };
    getName();
  }, [onboarded]);

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <ScrollView style={{ backgroundColor: colorTheme.neutral, flex: 1 }}>
      <View
        style={{
          backgroundColor: colorTheme.primary,
          height: fullHeight,
          position: "absolute",
          top: -fullHeight,
          left: 0,
          right: 0,
        }}
      />
      <View
        style={{ backgroundColor: colorTheme.primary, alignItems: "center" }}
      >
        <BannerAndIcon />
        <SettingModal navigation={navigation} />
        <Quotes />
      </View>
      <View style={{ backgroundColor: colorTheme.primary, flex: 1 }}>
        <View
          style={[
            styles.dashboard,
            {
              top: moderateScale(1),
              backgroundColor: colorTheme.neutral,
              borderTopLeftRadius: moderateScale(49),
              borderTopRightRadius: moderateScale(49),
              shadowOffset: {
                height: -10,
              },
              shadowOpacity: 0.2,
              elevation: 5,
            },
          ]}
        >
          <Text style={[styles.myName, { color: textTheme.text }]}>
            Hi {myName}
          </Text>
          <View style={styles.divider}></View>
          <CustomDatePicker widgetTitle="Events" />
          <View style={{ marginBottom: moderateScale(10) }}>
            <Todo widgetTitle="Todo" />
          </View>
          <Habits widgetTitle="Habits" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myName: {
    fontSize: moderateScale(35),
    textAlign: "left",
    fontFamily: "NotoSans_700Bold",
    left: moderateScale(24),
    paddingTop: moderateScale(24),
  },
  divider: {
    width: "87%", // moderateScale(327)
    left: moderateScale(24),
    height: moderateScale(1),
    backgroundColor: "gray",
    marginTop: moderateScale(5),
  },
  row: {
    flexDirection: "row",
  },
  groupRow: {
    flexDirection: "row",
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  dashboard: {
    width: "100%",
  },
});

export default HomeScreen;
