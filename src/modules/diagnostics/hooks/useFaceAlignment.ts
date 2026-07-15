import { useEffect, useMemo, useRef, useState } from "react";
import {
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

export function useFaceAlignment(
  facing: "front" | "back",
  layout: Layout,
) {
  const [status, setStatus] = useState<FaceStatus>("none");
  const device = useCameraDevice(facing);

  const faceDetectorOptions = useMemo(
    () => ({
      performanceMode: "fast" as const,
      autoMode: true,
      windowWidth: layout.cameraWidth,
      windowHeight: layout.cameraHeight,
      cameraFacing: facing,
    }),
    [layout.cameraWidth, layout.cameraHeight, facing],
  );

  const { detectFaces, stopListeners } = useFaceDetector(faceDetectorOptions);

  const statusRef = useRef(status);
  statusRef.current = status;

  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  useEffect(() => {
    return () => stopListeners();
  }, [stopListeners]);

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    const { cameraWidth, cameraHeight, ovalWidth } = layoutRef.current;

    if (faces.length === 0) {
      if (statusRef.current !== "none") setStatus("none");
      return;
    }

    const { bounds } = faces[0];
    const faceCenterX = bounds.x + bounds.width / 2;
    const faceCenterY = bounds.y + bounds.height / 2;

    const isCentered =
      Math.sqrt(
        Math.pow(faceCenterX - cameraWidth / 2, 2) +
          Math.pow(faceCenterY - cameraHeight / 2, 2),
      ) < 60;
    const isCloseEnough = bounds.width > ovalWidth * 0.8;

    const newStatus: FaceStatus = isCentered
      ? isCloseEnough
        ? "ok"
        : "far"
      : "uncentered";

    if (statusRef.current !== newStatus) setStatus(newStatus);
  });

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      const faces = detectFaces(frame);
      handleDetectedFaces(faces);
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
