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
import { moderateScale } from "react-native-size-matters";

const ImageInput = ({ imageUri, onChangeImage }) => {
  useEffect(() => {
    const retrieveImage = async () => {
      let retrieveImage = await AsyncStorage.getItem("Image");
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
    await AsyncStorage.removeItem("Image");
    onChangeImage(null);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.2,
        allowsEditing: true,
        aspect: [654, 489],
      });
      // console.log(result.uri);
      if (!result.cancelled) {
        await AsyncStorage.setItem("Image", JSON.stringify(result.uri));
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
            onError={() => Alert.alert(imageUri)}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageInput;
