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
import TemplateColors from "./TemplateColors";

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
  button: {
    left: 100,
    marginTop: 200,
  },
  image: {
    width: "100%",
    height: 190,
    marginBottom: 40,
  },
  profile: {
    position: "absolute",
    top: 120,
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "gray",
    overflow: "hidden",
    justifyContent: "center",
    left: 20,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: "gray",
    height: 190,
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
});

export default BannerAndIcon;
