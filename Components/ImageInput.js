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
  downloadImage2,
  uploadImage2,
  getUniqueDeviceID,
  deleteFile2,
} from "../firebase";

const ImageInput = ({ imageUri, onChangeImage }) => {
  const { textTheme } = React.useContext(RootContext);

  useEffect(() => {
    getUniqueDeviceID();
    const retrieveImage = async () => {
      let retrieveImage = await AsyncStorage.getItem("Image");
      retrieveImage = JSON.parse(retrieveImage);
      if (retrieveImage == null) onChangeImage(null);
      if (retrieveImage == null) {
        //check fire storage
        downloadImageImage();
      } else {
        onChangeImage(retrieveImage);
      }
    };
    requestPermision();
    retrieveImage();
  }, []);

  const downloadImageImage = async () => {
    const url = await downloadImage2();
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
    await AsyncStorage.removeItem("Image");
    onChangeImage(null);
    deleteFile2();
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
        await AsyncStorage.setItem("Image", JSON.stringify(result.uri));
        onChangeImage(result.uri);
        await uploadImageAsync(result.uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const uploadImageAsync = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    await uploadImage2(blob);
    blob.close();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={{
          height: moderateScale(244.5),
          width: moderateScale(327),
          borderRadius: moderateScale(24),
          marginTop: moderateScale(45),
          alignItems: "center",
          backgroundColor: "gray",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {!imageUri && <MaterialCommunityIcons name="camera" size={40} />}
        {imageUri && (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: imageUri }}
            onError={() =>
              Alert.alert(
                "Image disappearing has been fixed. Please reset your profile and banner pictures by pressing the gray box to delete!"
              )
            }
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageInput;
