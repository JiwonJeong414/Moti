import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Completed from "../Components/Completed";
import { moderateScale } from "react-native-size-matters";
import { RootContext } from "../config/RootContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";

const TemplateColors = () => {
  const { colorTheme, setColorTheme } = React.useContext(RootContext);
  const [themeOption, setThemeOption] = useState(null);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    if (themeOption) {
      const newColorTheme =
        themeOption === "option1"
          ? {
              primary: "#1C2331",
              secondary: "#252D3D",
              neutral: "#1A1F2C",
              accent1: "#E4D5B7",
              accent2: "#8B8FA3",
              cardBorder: "#2F374A",
              text: "#E4D5B7",
              subText: "#8B8FA3",
            }
          : themeOption === "option2"
          ? {
              primary: "#3A3F47",
              secondary: "#4C535E",
              neutral: "#333842",
              accent1: "#FFD700",
              accent2: "#A1A1A1",
              cardBorder: "#454F59",
              text: "#FFFFFF",
              subText: "#CCCCCC",
            }
          : themeOption === "option3"
          ? {
              primary: "#2E2E2E",
              secondary: "#3B3B3B",
              neutral: "#1E1E1E",
              accent1: "#FF5733",
              accent2: "#FFBD69",
              cardBorder: "#565656",
              text: "#FF5733",
              subText: "#FFBD69",
            }
          : {
              primary: "#1B1B2F",
              secondary: "#162447",
              neutral: "#1F4068",
              accent1: "#1B9AAA",
              accent2: "#E43F5A",
              cardBorder: "#1F4068",
              text: "#1B9AAA",
              subText: "#E43F5A",
            };

      setColorTheme(newColorTheme);
      AsyncStorage.setItem("ColorTheme", JSON.stringify(newColorTheme));
    }
  }, [themeOption]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.whiteBackground}>
        <Text style={[styles.header, { marginTop: moderateScale(14) }]}>
          Choose Theme
        </Text>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={() => setThemeOption("option1")}>
            <View style={[styles.themeOption, { backgroundColor: "#1C2331" }]}>
              {themeOption === "option1" ? <Completed /> : null}
              <Text style={styles.optionText}>Theme 1</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setThemeOption("option2")}>
            <View style={[styles.themeOption, { backgroundColor: "#3A3F47" }]}>
              {themeOption === "option2" ? <Completed /> : null}
              <Text style={styles.optionText}>Theme 2</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setThemeOption("option3")}>
            <View style={[styles.themeOption, { backgroundColor: "#2E2E2E" }]}>
              {themeOption === "option3" ? <Completed /> : null}
              <Text style={styles.optionText}>Theme 3</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setThemeOption("option4")}>
            <View style={[styles.themeOption, { backgroundColor: "#1B1B2F" }]}>
              {themeOption === "option4" ? <Completed /> : null}
              <Text style={styles.optionText}>Theme 4</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFEF7",
  },
  modalBackground: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: moderateScale(20),
  },
  header: {
    fontSize: moderateScale(28),
    fontWeight: "bold",
  },
  themeOption: {
    width: moderateScale(140),
    height: moderateScale(60),
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    margin: moderateScale(10),
  },
  optionText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  whiteBackground: {
    alignItems: "center",
  },
});

export default TemplateColors;
