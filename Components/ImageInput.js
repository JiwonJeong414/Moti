import React, { useState, useEffect } from "react";
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

const ImageInput = ({
  imageUri,
  onChangeImage,
  container,
  asyncStorageName,
}) => {
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
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const deleteImage = async () => {
    await AsyncStorage.deleteItem("Image");
    onChangeImage(null);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        allowsEditing: true,
        aspect: [10, 40],
      });
      console.log(result.uri);
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
      <View style={container}>
        {!imageUri && <MaterialCommunityIcons name="camera" size={40} />}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageInput;
