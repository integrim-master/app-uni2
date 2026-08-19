import React, { ComponentProps, RefObject, useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Camera, CameraDevice } from "react-native-vision-camera";

type Props = {
  ovalW: number;
  ovalH: number;
  ringColor: string;
  aligned: boolean;
  photoUri?: string | null;
  cameraRef: RefObject<Camera | null>;
  device?: CameraDevice;
  isActive?: boolean;
  frameProcessor: NonNullable<ComponentProps<typeof Camera>["frameProcessor"]>;
};

const TICK_COUNT = 60;
const PAD = 22;

export default function FaceCaptureRing({
  ovalW,
  ovalH,
  ringColor,
  aligned,
  photoUri,
  cameraRef,
  device,
  isActive = true,
  frameProcessor,
}: Props) {
  const boxW = ovalW + PAD * 2;
  const boxH = ovalH + PAD * 2;

  const ticks = useMemo(() => {
    const rx = boxW / 2;
    const ry = boxH / 2;
    return Array.from({ length: TICK_COUNT }, (_, i) => {
      const angle = (i / TICK_COUNT) * Math.PI * 2;
      const isMajor = i % 5 === 0;
      return {
        i,
        isMajor,
        x: rx + rx * Math.cos(angle),
        y: ry + ry * Math.sin(angle),
        rotateDeg: (angle * 180) / Math.PI + 90,
      };
    });
  }, [boxW, boxH]);

  return (
    <View style={styles.ringArea}>
      <View style={{ width: boxW, height: boxH }}>
        {ticks.map(({ i, isMajor, x, y, rotateDeg }) => (
          <View
            key={i}
            pointerEvents="none"
            style={[
              styles.tickAnchor,
              {
                left: x,
                top: y,
                transform: [
                  { translateX: -1 },
                  { translateY: isMajor ? -7 : -4 },
                  { rotate: `${rotateDeg}deg` },
                ],
              },
            ]}
          >
            <View
              style={{
                width: 2,
                height: isMajor ? 14 : 7,
                borderRadius: 1,
                opacity: aligned ? 0.95 : 0.35,
                backgroundColor: isMajor ? ringColor : "#8E8E93",
              }}
            />
          </View>
        ))}

        <View
          style={[
            styles.oval,
            {
              left: PAD,
              top: PAD,
              width: ovalW,
              height: ovalH,
              borderRadius: ovalW,
              borderColor: ringColor,
            },
          ]}
        >
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.fill} />
          ) : device ? (
            <Camera
              ref={cameraRef}
              style={styles.fill}
              device={device}
              isActive={isActive}
              photo
              frameProcessor={isActive ? frameProcessor : undefined}
              pixelFormat="yuv"
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ringArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tickAnchor: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  oval: {
    position: "absolute",
    borderWidth: 3,
    overflow: "hidden",
    backgroundColor: "#111",
  },
  fill: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
