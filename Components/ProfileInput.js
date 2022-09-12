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
import {downloadImage, uploadImage, getUniqueDeviceID, deleteFile} from '../firebase';
const ProfileInput = ({ imageUri, onChangeImage }) => {
  const { textTheme } = React.useContext(RootContext);

  useEffect(() => {
    getUniqueDeviceID()
    const retrieveImage = async () => {
      let retrieveImage = await AsyncStorage.getItem("Profile");
      retrieveImage = JSON.parse(retrieveImage);
      if (retrieveImage == null) {
        //check fire storage
        downloadProfileImage()
      }
      else {
        onChangeImage(retrieveImage);
      }
    };
    requestPermision();
    retrieveImage();
  }, []);

  const downloadProfileImage = async () => {
    const url = await downloadImage();
    if (url){
      onChangeImage(url)
    } else {
      onChangeImage(null);
    }
  }

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
    deleteFile()
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.2,
        allowsEditing: true,
        aspect: [224, 224],
      });
      
      if (!result.cancelled) {
        await AsyncStorage.setItem("Profile", JSON.stringify(result.uri));
        onChangeImage(result.uri);
        await uploadImageAsync(result.uri)
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    await uploadImage(blob)
    blob.close();
    
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
