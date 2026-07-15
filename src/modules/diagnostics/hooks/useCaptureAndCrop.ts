import * as ImageManipulator from "expo-image-manipulator";
import { RefObject, useState } from "react";
import { Camera } from "react-native-vision-camera";

type Layout = {
  cameraHeight: number;
  ovalWidth: number;
  ovalHeight: number;
};

export function useCaptureAndCrop(
  cameraRef: RefObject<Camera | null>,
  layout: Layout,
  canCapture: boolean,
) {
  const [capturing, setCapturing] = useState(false);
  const [photoUri, setPhotoUri] = useState<{ uri: string } | null>(null);

  const takePicture = async () => {
    if (capturing || !cameraRef.current || !canCapture) return;
    try {
      setCapturing(true);
      const photo = await cameraRef.current.takePhoto({ flash: "off" });
      const scale = photo.height / layout.cameraHeight;
      const cropped = await ImageManipulator.manipulateAsync(
        `file://${photo.path}`,
        [
          {
            crop: {
              originX: (photo.width - layout.ovalWidth * scale) / 2,
              originY: (photo.height - layout.ovalHeight * scale) / 2,
              width: layout.ovalWidth * scale,
              height: layout.ovalHeight * scale,
            },
          },
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      );
      setPhotoUri({ uri: cropped.uri });
    } catch (e) {
      console.error(e);
    } finally {
      setCapturing(false);
    }
  };

  return {
    capturing,
    photoUri,
    setPhotoUri,
    takePicture,
  };
}
