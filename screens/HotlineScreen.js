import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RootContext } from "../config/RootContext";
import call from "react-native-phone-call";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import { moderateScale } from "react-native-size-matters";

const HotlineScreen = () => {
  const { colorTheme, textTheme } = React.useContext(RootContext);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const SuicideHotline = {
    number: "8007848433", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const GriefSupport = {
    number: "6503215272", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const AssaultHotline = {
    number: "8006564673", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const SexualitySupport = {
    number: "8002467743", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const LifelineHotline = {
    number: "8002738255", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const DepressionHotline = {
    number: "6304829696", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const SaySomething = {
    number: "8445723663", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  return (
    <ScrollView style={{ backgroundColor: colorTheme.primary }}>
      <View style={[styles.container, { backgroundColor: colorTheme.primary }]}>
        <View
          style={[styles.clipboard, { backgroundColor: colorTheme.neutral }]}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: textTheme.text,
                marginTop:
                  Platform.OS === "ios" ? moderateScale(20) : moderateScale(10),
                fontSize: moderateScale(35),
                fontFamily: "NotoSans_700Bold",
              }}
            >
              HOTLINE
            </Text>
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
                  onPress={() => call(SuicideHotline)}
                  style={{ marginRight: moderateScale(10) }}
                >
                  <FontAwesome5
                    name="phone-alt"
                    size={moderateScale(20)}
                    color={colorTheme.accents}
                    style={styles.phone}
                  />
                </TouchableOpacity>
                <Text style={[styles.itemText, { color: textTheme.text }]}>
                  Suicide Hotline
                </Text>
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
                  onPress={() => call(GriefSupport)}
                  style={{ marginRight: moderateScale(10) }}
                >
                  <FontAwesome5
                    name="phone-alt"
                    size={moderateScale(20)}
                    color={colorTheme.accents}
                    style={styles.phone}
                  />
                </TouchableOpacity>
                <Text style={[styles.itemText, { color: textTheme.text }]}>
                  Grief Support
                </Text>
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
                  onPress={() => call(AssaultHotline)}
                  style={{ marginRight: moderateScale(10) }}
                >
                  <FontAwesome5
                    name="phone-alt"
                    size={moderateScale(20)}
                    color={colorTheme.accents}
                    style={styles.phone}
                  />
                </TouchableOpacity>
                <Text style={[styles.itemText, { color: textTheme.text }]}>
                  Assault Hotline
                </Text>
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
                  onPress={() => call(SexualitySupport)}
                  style={{ marginRight: moderateScale(10) }}
                >
                  <FontAwesome5
                    name="phone-alt"
                    size={moderateScale(20)}
                    color={colorTheme.accents}
                    style={styles.phone}
                  />
                </TouchableOpacity>
                <Text style={[styles.itemText, { color: textTheme.text }]}>
                  Sexuality Support
                </Text>
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
                  onPress={() => call(LifelineHotline)}
                  style={{ marginRight: moderateScale(10) }}
                >
                  <FontAwesome5
                    name="phone-alt"
                    size={moderateScale(20)}
                    color={colorTheme.accents}
                    style={styles.phone}
                  />
                </TouchableOpacity>
                <Text style={[styles.itemText, { color: textTheme.text }]}>
                  Lifeline Hotline
                </Text>
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
                  onPress={() => call(DepressionHotline)}
                  style={{ marginRight: moderateScale(10) }}
                >
                  <FontAwesome5
                    name="phone-alt"
                    size={moderateScale(20)}
                    color={colorTheme.accents}
                    style={styles.phone}
                  />
                </TouchableOpacity>
                <Text style={[styles.itemText, { color: textTheme.text }]}>
                  Depression Hotline
                </Text>
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
                  onPress={() => call(SaySomething)}
                  style={{ marginRight: moderateScale(10) }}
                >
                  <FontAwesome5
                    name="phone-alt"
                    size={moderateScale(20)}
                    color={colorTheme.accents}
                    style={styles.phone}
                  />
                </TouchableOpacity>
                <Text style={[styles.itemText, { color: textTheme.text }]}>
                  Say Something
                </Text>
              </View>
              <View
                style={[styles.circular, { borderColor: colorTheme.accents }]}
              ></View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  clipboard: {
    marginTop: Platform.OS === "ios" ? moderateScale(45) : moderateScale(25),
    width: "87%",
    height: Platform.OS === "ios" ? moderateScale(645) : moderateScale(595),
    borderRadius: moderateScale(40),
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  hotline: {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
    fontSize: moderateScale(35),
    fontFamily: "NotoSans_700Bold",
  },
  divider: {
    width: "85%",
    height: moderateScale(1),
    backgroundColor: "gray",
    marginTop: moderateScale(5),
    marginBottom: moderateScale(20),
  },
  item: {
    borderWidth: moderateScale(2),
    width: "90%",
    height: "9.5%",
    borderRadius: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(15),
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: "NotoSans_400Regular",
  },
  circular: {
    width: moderateScale(11),
    height: moderateScale(11),
    borderWidth: moderateScale(2),
    marginRight: moderateScale(20),
    borderRadius: moderateScale(4.5),
  },
  phone: {
    marginLeft: moderateScale(20),
  },
});

export default HotlineScreen;
