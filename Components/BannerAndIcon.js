import React, { useState, useEffect } from "react";
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
  Button,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImageInput from "../Components/ImageInput";
import ProfileInput from "../Components/ProfileInput";
import { moderateScale } from "react-native-size-matters";

const BannerAndIcon = () => {
  const [imageUri, setImageUri] = useState();
  const [profileUri, setProfileUri] = useState();

  const requestPermision = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  useEffect(() => {
    requestPermision();
  }, []);

  return (
    <View style={styles.container}>
      <ImageInput
        imageUri={imageUri}
        onChangeImage={(uri) => setImageUri(uri)}
        container={styles.imageContainer}
        asyncStorageName={"Banner"}
      ></ImageInput>
      <ProfileInput
        imageUri={profileUri}
        onChangeImage={(uri) => setProfileUri(uri)}
        container={styles.profile}
        asyncStorageName={"Profile"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    position: "absolute",
    top: moderateScale(206.5),
    left: moderateScale(131.5),
    width: moderateScale(112),
    height: moderateScale(112),
    borderRadius: moderateScale(100),
    borderWidth: moderateScale(3),
    alignItems: "center",
    backgroundColor: "gray",
    overflow: "hidden",
    justifyContent: "center",
  },
  imageContainer: {
    height: moderateScale(244.5),
    width: moderateScale(327),
    borderRadius: moderateScale(24),
    marginTop: moderateScale(45),
    marginLeft: moderateScale(24),
    alignItems: "center",
    backgroundColor: "gray",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default BannerAndIcon;
