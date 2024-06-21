import { getStorageInstance } from "@/utils/firebaseDB";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  MediaImageVideoEnum,
  MediaImageVideoType,
  UploadedImageVideoUrlType,
} from "@/types/mediaPost";

export const uploadFileImagesVideos = async (
  imagesVideos: MediaImageVideoType[],
) => {
  let uploadedImageVideoUrls: UploadedImageVideoUrlType[] = [];

  const uploadImageVideo = async (imageVideo: MediaImageVideoType) => {
    const storage = getStorageInstance();
    const getFileExtension = (fileName: string): string | null => {
      const regex = /(?:\.([^.]+))?$/;
      const match = fileName.match(regex);
      return match && match[1] ? match[1] : null;
    };

    const randomName = uuidv4();
    const format = getFileExtension(imageVideo.file.name);
    const storageRef = ref(
      storage,
      `posts/${imageVideo.type === MediaImageVideoEnum.IMAGE ? "images" : "videos"}/${randomName}.${format}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, imageVideo.file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              const uploadedImageVideo: UploadedImageVideoUrlType = {
                url: downloadURL,
                type: imageVideo.file.type.startsWith("video/")
                  ? MediaImageVideoEnum.VIDEO
                  : MediaImageVideoEnum.IMAGE,
              };
              uploadedImageVideoUrls.push(uploadedImageVideo);
              resolve(downloadURL);
            })
            .catch((error) => reject(error));
        },
      );
    });
  };

  try {
    await Promise.all(imagesVideos.map((image) => uploadImageVideo(image)));
  } catch (error) {
    console.error("Error uploading images:", error);
  }
  return uploadedImageVideoUrls;
};
