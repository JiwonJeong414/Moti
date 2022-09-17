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

import {
  downloadImage,
  handleUploadImage,
  getUniqueDeviceID,
  deleteFile,
  IMG_TYPE_PROFILE,
} from "../firebase";

const ProfileInput = ({ imageUri, onChangeImage }) => {
  const { textTheme } = React.useContext(RootContext);
  // Check Deleted Branch
  useEffect(() => {
    getUniqueDeviceID();
    const retrieveImage = async () => {
      let retrieveImagePathStr = await AsyncStorage.getItem("Profile");
      const retrieveImageObj = JSON.parse(retrieveImagePathStr);
      console.log("🚀 ~ file: ProfileInput.js ~ line 31 ~ retrieveImage ~ retrieveImageObj", retrieveImageObj);
      if (retrieveImageObj == null) onChangeImage(null);
      if (retrieveImageObj == null) {
        //check fire storage
        downloadProfileImage();
      } else {
        onChangeImage(retrieveImageObj);
        console.log("🚀 ~ file: ProfileInput.js ~ line 37 ~ retrieveImage ~ retrieveImageObj", retrieveImageObj);
      }
    };
    requestPermision();
    retrieveImage();
  }, []);

  const downloadProfileImage = async () => {
    const url = await downloadImage();
    if (url) {
      onChangeImage(url);
    } else {
      onChangeImage(null);
    }
  };

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
    deleteFile();
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
        await uploadImageAsync(result.uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const uploadImageAsync = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onload = function() {
    //     resolve(xhr.response);
    //   };
    //   xhr.onerror = function(e) {
    //     console.log(e);
    //     reject(new TypeError('Network request failed'));
    //   };
    //   xhr.responseType = 'blob';
    //   xhr.open('GET', uri, true);
    //   xhr.send(null);
    // });
    // await uploadImage(blob)
    // blob.close();
    await handleUploadImage(uri, IMG_TYPE_PROFILE)
  }

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
