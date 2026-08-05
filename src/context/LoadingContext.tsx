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
  Text,
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

            <View className="flex-1 items-center justify-center gap-4 p-4">
              <View className="size-80">
                <LottieView
                  source={require("@/assets/animations/loader.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
                {message ? <Text style={styles.message}>{message}</Text> : null}
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
    paddingHorizontal: 32,
    gap: 16,
  },
  lottieWrap: {
    width: 280,
    height: 280,
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    letterSpacing: 0.4,
  },
});
