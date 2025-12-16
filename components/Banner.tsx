import React from "react";
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface BannerProps {
  bannerData: {
    title:  string;
    description: string;
    image: string;
  };
  visible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get("window");

export const BannerModal = ({ bannerData, visible, onClose }: BannerProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.bannerContainer} 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left:  10, right: 10 }}
          >
            <View style={styles.closeCircle}>
              <Text style={styles.closeText}>✕</Text>
            </View>
          </TouchableOpacity>

          
          <Image 
            source={require("../assets/images/campana.jpg")} 
            style={styles.bannerImage}
            resizeMode="cover"
          />

          {/* {bannerData.title && (
            <View style={styles.contentContainer}>
              <Text style={styles.bannerTitle}>{bannerData.title}</Text>
              {bannerData.description && (
                <Text style={styles.bannerDescription}>
                  {bannerData. description}
                </Text>
              )}
            </View>
          )} */}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
  },
  bannerContainer: {
    width: width * 0.85,
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity:  0.3,
    shadowRadius: 8,
    elevation: 10,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right:  10,
    zIndex:  10,
  },
  closeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    ... Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:  0.3,
        shadowRadius: 3,
      },
      android:  {
        elevation: 4,
      },
    }),
  },
  closeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    lineHeight: 20,
  },
  bannerImage: {
    width: "100%",
    height: height * 0.65,
    maxHeight: 550,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    width: "100%",
    padding: 20,
    paddingTop: 15,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#1a1a1a",
  },
  bannerDescription: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});