import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { BlurTargetView, BlurView } from "expo-blur";
import LottieView from "lottie-react-native";
import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import {
  ImageSourcePropType,
  Platform,
  StyleSheet,
  View,
} from "react-native";

interface LoadingContextType {
  showLoading: (msg?: string, photo?: ImageSourcePropType | null) => void;
  hideLoading: () => void;
  runWithLoading: <T>(
    promiseFn: () => Promise<T>,
    msg?: string,
    photo?: ImageSourcePropType | null,
  ) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const blurTargetRef = useRef<View | null>(null);

  const showLoading = (
    msg = "",
    _photoArg: ImageSourcePropType | null = null,
  ) => {
    setMessage(msg);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
    setMessage("");
  };

  const runWithLoading = async <T,>(
    promiseFn: () => Promise<T>,
    msg = "Cargando...",
    photoArg: ImageSourcePropType | null = null,
  ): Promise<T> => {
    try {
      showLoading(msg, photoArg);
      const result = await promiseFn();
      hideLoading();
      return result;
    } catch (err) {
      hideLoading();
      throw err;
    }
  };

  return (
    <LoadingContext.Provider
      value={{ showLoading, hideLoading, runWithLoading }}
    >
      <View style={styles.root}>
        <BlurTargetView ref={blurTargetRef} style={styles.root}>
          {children}
        </BlurTargetView>

        {loading ? (
          <View pointerEvents="auto" style={styles.overlay}>
            <BlurView
              blurTarget={blurTargetRef}
              blurMethod={
                Platform.OS === "android" ? "dimezisBlurView" : undefined
              }
              intensity={20}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.center}>
              <View style={styles.lottieWrap}>
                <LottieView
                  source={require("@/assets/animations/loader.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
                {message ? (
                  <ThemedText type="caption" tone="inverse" align="center">
                    {message}
                  </ThemedText>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
  },

  center: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: ui.spacing.xxl,
    gap: ui.spacing.lg,
  },
  lottieWrap: {
    width: 280,
    height: 280,
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
});
