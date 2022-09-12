import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { getFirestore, setDoc, doc} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import * as Device from 'expo-device';
import AsyncStorage from "@react-native-async-storage/async-storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmB1o2YLuUJfJFqYDBMxijuGFFFw1cprQ",
  authDomain: "hatbanking-8fe66.firebaseapp.com",
  projectId: "hatbanking-8fe66",
  storageBucket: "hatbanking-8fe66.appspot.com",
  messagingSenderId: "38643457145",
  appId: "1:38643457145:web:ac3a4742337a35f45808a8",
  measurementId: "G-3D0WP0TGDS"
};

let myApp = initializeApp(firebaseConfig);
// export const storage = getStorage(myApp);
export const storage = getStorage();
const storageRef = ref(storage);

export const getUniqueDeviceID = async () => {
  try {
    let deviceID = await AsyncStorage.getItem("DeviceID");  
    if (!deviceID){
      deviceID = uuidv4();
      await AsyncStorage.setItem("DeviceID", deviceID);
    }
    console.log("🚀 ~ file: firebase.js ~ line 34 ~ getUniqueDeviceID ~ deviceID", deviceID);
    return deviceID;
  } catch (error) {
    return null;
  }
    
    
}

export const setUniqueDeviceID = async () => {
  try {
    let uuid = uuidv4();
    await AsyncStorage.setItem("DeviceID", uuid);
  } catch (error) {
    return null
  }
}


export const uploadImage = async (file) => {
  let deviceID = await getUniqueDeviceID();
  const profileImgRef = ref(storage, `images/${deviceID}/profile.jpg`);
  // 'file' comes from the Blob or File API
  uploadBytes(profileImgRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}

export const downloadImage = async () => {
  let deviceID = await getUniqueDeviceID();
  const profileImgRef = ref(storage, `images/${deviceID}/profile.jpg`);
  const fileRef = ref(profileImgRef);
  // Get the download URL
  return getDownloadURL(fileRef)
    .then((url) => {
      return url
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
      return null;
    });
}


export const deleteFile = async () => {
  let deviceID = await getUniqueDeviceID();
  const profileImgRef = ref(storage, `images/${deviceID}/profile.jpg`);
  // Delete the file
  deleteObject(profileImgRef).then(() => {
    // File deleted successfully
    console.log('File deleted successfully')
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
}