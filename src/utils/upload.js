import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
//upload file
export const uploadFile = async (file) => {
  try {
    const storageRef = ref(storage, file.name);
    storageRef.metadata = {
      contentType: file.type,
    };
    const response = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(response.ref);
    return downloadURL;
  } catch (error) {
    console.log(error);
    return null;
  }
};
