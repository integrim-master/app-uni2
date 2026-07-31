import { getErrorMessage, showErrorToast } from "@/src/utils/showErrorToast";
import * as ImageManipulator from "expo-image-manipulator";
import { RefObject, useCallback, useState } from "react";
import { Camera } from "react-native-vision-camera";

/**
 * Toma la foto tal cual la entrega la cámara (sin recortar). Solo se
 * recomprime a JPEG para no subir el archivo crudo del sensor sin control
 * de tamaño. El óvalo en pantalla es únicamente una guía visual para el
 * usuario, no define una región de recorte real.
 */
export function useCapturePhoto(
  cameraRef: RefObject<Camera | null>,
  canCapture: boolean,
) {
  const [capturing, setCapturing] = useState(false);
  const [photoUri, setPhotoUri] = useState<{ uri: string } | null>(null);

  const takePicture = useCallback(async () => {
    if (capturing || !cameraRef.current || !canCapture) return;
    try {
      setCapturing(true);
      const photo = await cameraRef.current.takePhoto({ flash: "off" });
      const compressed = await ImageManipulator.manipulateAsync(
        `file://${photo.path}`,
        [],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      );
      setPhotoUri({ uri: compressed.uri });
    } catch (e) {
      showErrorToast("No se pudo tomar la foto", getErrorMessage(e));
    } finally {
      setCapturing(false);
    }
  }, [cameraRef, canCapture, capturing]);

  return {
    capturing,
    photoUri,
    setPhotoUri,
    takePicture,
  };
}
