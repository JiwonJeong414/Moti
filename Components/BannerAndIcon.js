import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImageInput from "../Components/ImageInput";
import ProfileInput from "../Components/ProfileInput";

const BannerAndIcon = () => {
  const [imageUri, setImageUri] = useState();
  const [profileUri, setProfileUri] = useState();

  const requestPermision = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      ></ImageInput>
      <View style={{ alignItems: "center" }}>
        <ProfileInput
          imageUri={profileUri}
          onChangeImage={(uri) => setProfileUri(uri)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BannerAndIcon;
