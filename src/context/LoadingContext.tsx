import BrandSpinner from "@/src/components/shared/BrandSpinner";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Image,
  ImageSourcePropType,
  Modal,
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
  const [photo, setPhoto] = useState<ImageSourcePropType | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (loading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 65,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [loading, fadeAnim, scaleAnim]);

  const showLoading = (
    msg = "Cargando...",
    photoArg: ImageSourcePropType | null = null,
  ) => {
    setPhoto(photoArg);
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
      {children}

      <Modal
        visible={loading}
        transparent
        animationType="none"
        statusBarTranslucent
      >
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Animated.View
            style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
          >
            {photo ? (
              <View style={styles.photoContainer}>
                <Image source={photo} style={styles.photo} resizeMode="cover" />
                <View style={styles.photoOverlay} />
              </View>
            ) : null}

            <View style={styles.content}>
              <BrandSpinner />
              <Text style={styles.message}>{message}</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(226,177,85,0.12)",
    overflow: "hidden",
    minWidth: 220,
    maxWidth: 300,
    shadowColor: "#E2B155",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 20,
  },
  photoContainer: {
    width: "100%",
    height: 160,
    position: "relative",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  photoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  content: {
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 24,
    gap: 16,
  },
  message: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E5E7EB",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  progressBar: {
    width: "80%",
    height: 3,
    backgroundColor: "rgba(226,177,85,0.1)",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 4,
  },
  progressFill: {
    width: "40%",
    height: "100%",
    backgroundColor: "#E2B155",
    borderRadius: 2,
  },
});
