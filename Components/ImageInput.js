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
  IMG_TYPE_BACKGROUND,
} from "../firebase";

const ImageInput = ({ imageUri, onChangeImage }) => {
  const { textTheme } = React.useContext(RootContext);

  useEffect(() => {
    getUniqueDeviceID();
    const retrieveImage = async () => {
      let retrieveImageObj = await AsyncStorage.getItem("Image");
      try {
        const img = await fetch(retrieveImageObj);
        const blob = await img.blob();
        if (blob) {
          onChangeImage(retrieveImageObj);
        } else {
          downloadImageImage();
        }
      } catch (error) {
        downloadImageImage();
      }
    };

    requestPermision();
    retrieveImage();
  }, []);

  const downloadImageImage = async () => {
    const url = await downloadImage(IMG_TYPE_BACKGROUND);
    if (url) {
      onChangeImage(url);
      await AsyncStorage.setItem("Image", url);
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
    deleteFile(IMG_TYPE_BACKGROUND);
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
        // await AsyncStorage.setItem("Image", JSON.stringify(result.uri));
        onChangeImage(result.uri);
        await uploadImageAsync(result.uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const uploadImageAsync = async (uri) => {
    await handleUploadImage(uri, IMG_TYPE_BACKGROUND);
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
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageInput;
