import { BackButton } from "@/src/components/shared/BackButton";
import { MenuSection } from "@/src/components/shared/MenuSection";
import { Screen } from "@/src/components/shared/Screen";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileDetailScreen() {
  const { colors } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["45%", "75%"], []);

  const {user} =useAuth();


  const openSheet = useCallback(() => {
    setIsSheetOpen(true);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleSheetClose = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <Screen safeArea={true} >
      <BackButton to={'/profile'}  />
      <ScrollView>
        <View style={[styles.headerContainer]}>
          <View
            style={[
              styles.avatarCircle,
              { backgroundColor: colors.primaryLight, borderColor: colors.cardTextDark },
            ]}
          >
            <Text style={[styles.avatarInitial, { color: colors.cardTextDark }]}>
              {user?.user_name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={[styles.name, { color: "#fff" }]}>{user?.user_name}</Text>
          <Text style={[styles.email, { color: "rgba(255,255,255,0.8)" }]}>{user?.user_email}</Text>

          <Pressable style={[styles.editButton, { backgroundColor: colors.primaryDark }]} onPress={openSheet}>
            <Ionicons name="create-outline" size={18} color="#fff" />
            <Text style={styles.editText}>Editar perfil</Text>
          </Pressable>
        </View>

        <View style={styles.sectionWrapper}>
          <MenuSection
            title="Datos de contacto"
            items={[
              { title: "Correo", label: user?.user_email },
              { title: "Teléfono", label: user?.user_phone },
              { title: "País", label: 'colombia' },
            ]}
          />

          <MenuSection
            title="Datos personales"
            items={[
              { title: "Nombre", label: user?.user_name },
             
            ]}
          />
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={isSheetOpen ? 0 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onClose={handleSheetClose}
        backgroundStyle={{ backgroundColor: "transparent" }}
        handleIndicatorStyle={{ backgroundColor: "#ffffffcc" }}
      >
        <LinearGradient
          colors={["#1a1a1c", "#0f0f10"]}
          style={styles.luxuryContainer}
        >
          <BlurView intensity={25} tint="dark" style={styles.blurLayer} />

          <BottomSheetView style={{ padding: 24 }}>
            <Text style={styles.title}>Editar perfil</Text>

            <Text style={styles.subtitle}>
              Personaliza los datos asociados a tu cuenta.
            </Text>

            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>Nombre</Text>
              <View style={styles.fieldBox}>
                <Text style={styles.fieldText}>{user?.user_name}</Text>
              </View>
            </View>
            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>Correo</Text>
              <View style={styles.fieldBox}>
                <Text style={styles.fieldText}>{user?.user_email}</Text>
              </View>
            </View>

            <Pressable style={styles.saveButton} onPress={handleSheetClose}>
              <LinearGradient
                colors={[colors.primaryDark, colors.primaryLight]}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>Guardar cambios</Text>
              </LinearGradient>
            </Pressable>
          </BottomSheetView>
        </LinearGradient>
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomRightRadius: 40,
  },

  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  avatarInitial: {
    fontSize: 48,
    fontWeight: "700",
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },

  email: {
    fontSize: 14,
    marginTop: 2,
  },

  editButton: {
    marginTop: 14,
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: "center",
  },

  editText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "600",
  },

  sectionWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },


  luxuryContainer: {
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { height: -6, width: 0 },
  },

  blurLayer: {
    ...StyleSheet.absoluteFillObject,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },

  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginBottom: 24,
  },

  fieldWrapper: {
    marginBottom: 16,
  },

  fieldLabel: {
    color: "rgba(255,255,255,0.8)",
    marginBottom: 6,
  },

  fieldBox: {
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  fieldText: {
    color: "#fff",
  },

  saveButton: {
    marginTop: 24,
    borderRadius: 12,
    overflow: "hidden",
  },

  saveButtonGradient: {
    paddingVertical: 14,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
