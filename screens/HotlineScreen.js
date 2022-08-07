import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { RootContext } from "../config/RootContext";
import call from "react-native-phone-call";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import { moderateScale } from "react-native-size-matters";
import { IconButton } from "react-native-paper";
import Tasktest from "../Components/Tasktest";

const HotlineScreen = () => {
  const { colorTheme } = React.useContext(RootContext);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const args = {
    number: "9492998258", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  return (
    <View style={[styles.container, { backgroundColor: colorTheme.primary }]}>
      <View style={[styles.clipboard, { backgroundColor: colorTheme.neutral }]}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.hotline}>HOTLINE</Text>
          <View style={styles.divider}></View>
          <View
            style={[
              styles.item,
              {
                borderColor: colorTheme.accents,
                backgroundColor: colorTheme.primary,
              },
            ]}
          >
            <View style={styles.itemLeft}>
              <TouchableOpacity
                onPress={() => call(args)}
                style={{ marginRight: moderateScale(10) }}
              >
                <FontAwesome5
                  name="phone-alt"
                  size={moderateScale(20)}
                  color={colorTheme.accents}
                />
              </TouchableOpacity>
              <Text style={styles.itemText}>Suicide Hotline</Text>
            </View>
            <View
              style={[styles.circular, { borderColor: colorTheme.accents }]}
            ></View>
          </View>
          <View
            style={[
              styles.item,
              {
                borderColor: colorTheme.accents,
                backgroundColor: colorTheme.primary,
              },
            ]}
          >
            <View style={styles.itemLeft}>
              <TouchableOpacity
                onPress={() => call(args)}
                style={{ marginRight: moderateScale(10) }}
              >
                <FontAwesome5
                  name="phone-alt"
                  size={moderateScale(20)}
                  color={colorTheme.accents}
                />
              </TouchableOpacity>
              <Text style={styles.itemText}>Grief Support</Text>
            </View>
            <View
              style={[styles.circular, { borderColor: colorTheme.accents }]}
            ></View>
          </View>
          <View
            style={[
              styles.item,
              {
                borderColor: colorTheme.accents,
                backgroundColor: colorTheme.primary,
              },
            ]}
          >
            <View style={styles.itemLeft}>
              <TouchableOpacity
                onPress={() => call(args)}
                style={{ marginRight: moderateScale(10) }}
              >
                <FontAwesome5
                  name="phone-alt"
                  size={moderateScale(20)}
                  color={colorTheme.accents}
                />
              </TouchableOpacity>
              <Text style={styles.itemText}>Assualt Hotline</Text>
            </View>
            <View
              style={[styles.circular, { borderColor: colorTheme.accents }]}
            ></View>
          </View>
          <View
            style={[
              styles.item,
              {
                borderColor: colorTheme.accents,
                backgroundColor: colorTheme.primary,
              },
            ]}
          >
            <View style={styles.itemLeft}>
              <TouchableOpacity
                onPress={() => call(args)}
                style={{ marginRight: moderateScale(10) }}
              >
                <FontAwesome5
                  name="phone-alt"
                  size={moderateScale(20)}
                  color={colorTheme.accents}
                />
              </TouchableOpacity>
              <Text style={styles.itemText}>Sexuality Support</Text>
            </View>
            <View
              style={[styles.circular, { borderColor: colorTheme.accents }]}
            ></View>
          </View>
          <View
            style={[
              styles.item,
              {
                borderColor: colorTheme.accents,
                backgroundColor: colorTheme.primary,
              },
            ]}
          >
            <View style={styles.itemLeft}>
              <TouchableOpacity
                onPress={() => call(args)}
                style={{ marginRight: moderateScale(10) }}
              >
                <FontAwesome5
                  name="phone-alt"
                  size={moderateScale(20)}
                  color={colorTheme.accents}
                />
              </TouchableOpacity>
              <Text style={styles.itemText}>Lifeline Hotline</Text>
            </View>
            <View
              style={[styles.circular, { borderColor: colorTheme.accents }]}
            ></View>
          </View>
          <View
            style={[
              styles.item,
              {
                borderColor: colorTheme.accents,
                backgroundColor: colorTheme.primary,
              },
            ]}
          >
            <View style={styles.itemLeft}>
              <TouchableOpacity
                onPress={() => call(args)}
                style={{ marginRight: moderateScale(10) }}
              >
                <FontAwesome5
                  name="phone-alt"
                  size={moderateScale(20)}
                  color={colorTheme.accents}
                />
              </TouchableOpacity>
              <Text style={styles.itemText}>Depression Hotline</Text>
            </View>
            <View
              style={[styles.circular, { borderColor: colorTheme.accents }]}
            ></View>
          </View>
          <View
            style={[
              styles.item,
              {
                borderColor: colorTheme.accents,
                backgroundColor: colorTheme.primary,
              },
            ]}
          >
            <View style={styles.itemLeft}>
              <TouchableOpacity
                onPress={() => call(args)}
                style={{ marginRight: moderateScale(10) }}
              >
                <FontAwesome5
                  name="phone-alt"
                  size={moderateScale(20)}
                  color={colorTheme.accents}
                />
              </TouchableOpacity>
              <Text style={styles.itemText}>Say Something</Text>
            </View>
            <View
              style={[styles.circular, { borderColor: colorTheme.accents }]}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clipboard: {
    marginTop: moderateScale(45),
    left: moderateScale(24),
    width: moderateScale(330),
    height: moderateScale(660),
    borderRadius: moderateScale(40),
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  hotline: {
    marginTop: moderateScale(20),
    fontSize: moderateScale(35),
    fontFamily: "NotoSans_700Bold",
  },
  divider: {
    width: moderateScale(280),
    height: moderateScale(1),
    backgroundColor: "gray",
    marginTop: moderateScale(5),
    marginBottom: moderateScale(20),
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
  },
  addWrapper: {
    position: "absolute",
    bottom: 20,
    left: 330,
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  item: {
    borderWidth: 2,
    padding: 15,
    width: moderateScale(280),
    borderRadius: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(15),
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    fontSize: moderateScale(18),
    fontFamily: "NotoSans_400Regular",
  },
  circular: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default HotlineScreen;
