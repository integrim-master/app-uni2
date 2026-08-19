import { useEffect, useMemo, useRef, useState } from "react";
import {
  runAtTargetFps,
  useCameraDevice,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  Face,
  useFaceDetector,
} from "react-native-vision-camera-face-detector";
import { Worklets } from "react-native-worklets-core";

export type FaceStatus = "none" | "far" | "uncentered" | "ok";

type Layout = {
  cameraWidth: number;
  cameraHeight: number;
  ovalWidth: number;
};

export function useFaceAlignment(facing: "front" | "back", layout: Layout) {
  const [status, setStatus] = useState<FaceStatus>("none");
  const device = useCameraDevice(facing);

  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  // Opciones estables: recrear el detector en cada render rompe release.
  const faceDetectionOptions = useRef({
    performanceMode: "fast" as const,
    autoMode: true,
    windowWidth: layout.cameraWidth,
    windowHeight: layout.cameraHeight,
    cameraFacing: facing,
  }).current;

  faceDetectionOptions.windowWidth = layout.cameraWidth;
  faceDetectionOptions.windowHeight = layout.cameraHeight;
  faceDetectionOptions.cameraFacing = facing;

  const { detectFaces, stopListeners } = useFaceDetector(faceDetectionOptions);

  useEffect(() => {
    return () => stopListeners();
  }, [stopListeners]);

  const handleDetectedFaces = useMemo(
    () =>
      Worklets.createRunOnJS((faces: Face[]) => {
        const { cameraWidth, cameraHeight, ovalWidth } = layoutRef.current;

        if (faces.length === 0) {
          setStatus("none");
          return;
        }

        const { bounds } = faces[0];
        const faceCenterX = bounds.x + bounds.width / 2;
        const faceCenterY = bounds.y + bounds.height / 2;
        const distance = Math.hypot(
          faceCenterX - cameraWidth / 2,
          faceCenterY - cameraHeight / 2,
        );

        const isCentered = distance < ovalWidth * 0.12;
        const isCloseEnough = bounds.width > ovalWidth * 0.8;

        if (!isCentered) {
          setStatus("uncentered");
        } else if (!isCloseEnough) {
          setStatus("far");
        } else {
          setStatus("ok");
        }
      }),
    [],
  );

  /**
   * No usar `runAsync` en Android: en APK release provoca
   * RNWorklet::JsiWorkletContext::invokeOnWorkletThread (BusError).
   * `runAtTargetFps` corre en el mismo hilo del frame processor.
   */
  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      runAtTargetFps(5, () => {
        "worklet";
        try {
          const faces = detectFaces(frame);
          handleDetectedFaces(faces);
        } catch {

        }
      });
    },
    [detectFaces, handleDetectedFaces],
  );

  return {
    device,
    status,
    isFaceAligned: status === "ok",
    frameProcessor,
  };
}
