import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootContext } from "../config/RootContext";
import { moderateScale } from "react-native-size-matters";

const ProfileInput = ({ imageUri, onChangeImage }) => {
  const { textTheme } = React.useContext(RootContext);

  useEffect(() => {
    const retrieveImage = async () => {
      let retrieveImage = await AsyncStorage.getItem("Profile");
      retrieveImage = JSON.parse(retrieveImage);
      if (retrieveImage == null) onChangeImage(null);
      else onChangeImage(retrieveImage);
    };
    requestPermision();
    retrieveImage();
  }, []);

  const requestPermision = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: deleteImage },
        { text: "No" },
      ]);
  };

  const deleteImage = async () => {
    await AsyncStorage.removeItem("Profile");
    onChangeImage(null);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.2,
        allowsEditing: true,
        aspect: [224, 224],
      });
      // console.log(result.uri);
      if (!result.cancelled) {
        await AsyncStorage.setItem("Profile", JSON.stringify(result.uri));
        onChangeImage(result.uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={{
          position: "absolute",
          bottom: moderateScale(-40),
          width: moderateScale(112),
          height: moderateScale(112),
          borderRadius: moderateScale(100),
          borderWidth: moderateScale(3),
          alignItems: "center",
          backgroundColor: "gray",
          overflow: "hidden",
          justifyContent: "center",
          borderColor: textTheme.text,
        }}
      >
        {!imageUri && <MaterialCommunityIcons name="camera" size={40} />}
        {imageUri && (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: imageUri }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileInput;
