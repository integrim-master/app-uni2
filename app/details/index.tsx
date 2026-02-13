import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useEditProfile } from "@/src/modules/profile/hooks/useEditProfile";
import { useInfoProfile } from "@/src/modules/profile/hooks/useMeProfile";
import { ui } from "@/src/themes/ui";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ProfileDetailScreen() {
  const { colors } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["45%", "75%"], []);
  const [data, setData] = useState({
    user_name: "",
    id: 0,
  });

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { setUser, updateUserInStorage } = useAuth();
  const { mutate, isPending } = useEditProfile();
  const { data: user } = useInfoProfile();

  const openSheet = useCallback(() => {
    setData((prev) => ({
      ...prev,
      user_name: user?.nombre || "",
      id: Number(user?.user_id ?? 0),
    }));
    setIsSheetOpen(true);
    bottomSheetRef.current?.snapToIndex(0);
  }, [user]);

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
    [],
  );

  const handleSubmit = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    mutate(
      {
        id: data.id,
        user_name: data.user_name,
      },
      {
        onSuccess: async () => {
          // if (user) {
          //   const updatedUser = {
          //     ...user,
          //     user_name: data.user_name,
          //   };
          //   setUser(updatedUser);
          //   if (typeof updateUserInStorage === "function") {
          //     await updateUserInStorage(updatedUser);
          //   }
          // }

          Toast.show({
            type: "success",
            text1: "¡Perfil actualizado!",
            text2: "Tus cambios se guardaron exitosamente",
            position: "top",
            visibilityTime: 3000,
            topOffset: 60,
          });

          setTimeout(() => {
            bottomSheetRef.current?.close();
            setIsSheetOpen(false);
          }, 800);
        },

        onError: (error: any) => {
          console.error("Error updating profile:", error);

          Toast.show({
            type: "error",
            text1: " Error al actualizar",
            text2:
              error?.message ||
              "No se pudieron guardar los cambios. Intenta de nuevo.",
            position: "top",
            visibilityTime: 4000,
            topOffset: 60,
          });
        },
      },
    );
  };

  return (
    <Screen safeArea={true}>
      {/* <BackButton to={"/profile"} /> */}
      <ScrollView>
        <View style={[styles.headerContainer]}>
          <View
            style={[
              styles.avatarCircle,
              {
                backgroundColor: colors.primaryLight,
              },
            ]}
          >
            <Text
              style={[styles.avatarInitial, { color: colors.cardTextDark }]}
            >
              {user?.nombre.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={[styles.name, { color: "#fff" }]}>{user?.nombre}</Text>
          <Text style={[styles.email, { color: "rgba(255,255,255,0.8)" }]}>
            {user?.nombre}
          </Text>

          <PrimaryButton
            title="Editar perfil"
            onPress={() => router.push("/details/edit")}
            style={{ marginTop: 14, alignSelf: "center" }}
          />

          {/* <Pressable
            style={[styles.editButton, { backgroundColor: colors.primaryDark }]}
            onPress={openSheet}
          >
            <Ionicons name="create-outline" size={18} color="#fff" />
            <Text style={styles.editText}>Editar perfil</Text>
          </Pressable> */}
        </View>

        <View style={styles.sectionWrapper} className="flex gap-2">
          <SimpleMenuSection
            sectionTitle="Datos de contacto"
            items={[
              {
                title: "Correo",
                subtitle: user?.nombre || "N/A",
                icon: "mail-outline",
              },
              {
                title: "Teléfono",
                subtitle: user?.telefono || "N/A",
                icon: "call-outline",
              },
            ]}
          />
          <SimpleMenuSection
            sectionTitle="Datos personales"
            items={[
              {
                title: "Nombre",
                subtitle: user?.nombre || "N/A",
                icon: "person-outline",
              },
              {
                title: "Identificación",
                subtitle: user?.type_id?.toString() || "N/A",
                icon: "card-outline",
              },
              {
                title: "Tipo de identificación",
                subtitle: user?.identificacion || "N/A",
                icon: "id-card-outline",
              },
              {
                title: "Financiamiento",
                subtitle: user?.fnacimiento || "N/A",
                icon: "calendar-outline",
              },
            ]}
          />
          <SimpleMenuSection
            sectionTitle="Datos de residencia"
            items={[
              {
                title: "País origen",
                subtitle: user?.pais_origen || "N/A",
                icon: "flag-outline",
              },
              {
                title: "País residencia",
                subtitle: user?.pais_residencia || "N/A",
                icon: "home-outline",
              },
              {
                title: "Provincia",
                subtitle: user?.provincia || "N/A",
                icon: "map-outline",
              },
              {
                title: "Ciudad",
                subtitle: user?.pais_residencia || "N/A",
                icon: "business-outline",
              },
              {
                title: "Postal",
                subtitle: user?.postal || "N/A",
                icon: "mail-open-outline",
              },
            ]}
          />
        </View>
      </ScrollView>

      {/* <BottomSheet
        ref={bottomSheetRef}
        index={isSheetOpen ? 0 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        backdropComponent={renderBackdrop}
        onClose={handleSheetClose}
        backgroundStyle={{ backgroundColor: "transparent" }}
        handleIndicatorStyle={{ backgroundColor: "#ffffffcc" }}
        animateOnMount={true}
      >
        <LinearGradient
          colors={["#1a1a1c", "#0f0f10"]}
          style={styles.luxuryContainer}
        >
          <BlurView intensity={25} tint="dark" style={styles.blurLayer} />

          <BottomSheetView style={{ padding: 24 }}>
            <View style={styles.headerSection}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-circle-outline" size={28} color="#fff" />
              </View>
              <Text style={styles.title}>Editar perfil</Text>
              <Text style={styles.subtitle}>
                Personaliza los datos asociados a tu cuenta.
              </Text>
            </View>

            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>
                <Ionicons
                  name="person-outline"
                  size={14}
                  color="rgba(255,255,255,0.8)"
                />{" "}
                Nombre
              </Text>
              <View
                style={[styles.fieldBox, isPending && styles.fieldBoxDisabled]}
              >
                <BottomSheetTextInput
                  style={[styles.fieldText, { color: "#fff" }]}
                  value={data.user_name}
                  placeholder="Ingresa tu nombre"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  editable={!isPending}
                  onChangeText={(text) =>
                    setData((prev) => ({
                      ...prev,
                      user_name: text,
                    }))
                  }
                />
              </View>
            </View>

            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>
                <Ionicons
                  name="mail-outline"
                  size={14}
                  color="rgba(255,255,255,0.8)"
                />{" "}
                Correo
              </Text>
              <View style={[styles.fieldBox, styles.fieldBoxDisabled]}>
                <Text style={[styles.fieldText, { opacity: 0.7 }]}>
                  {user?.nombre}
                </Text>
              </View>
              <Text style={styles.helperText}>
                El correo no puede ser modificado
              </Text>
            </View>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Pressable
                style={[
                  styles.saveButton,
                  isPending && styles.saveButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isPending || !data.user_name.trim()}
              >
                <LinearGradient
                  colors={
                    isPending
                      ? ["#666", "#444"]
                      : [colors.primaryDark, colors.primaryLight]
                  }
                  style={styles.saveButtonGradient}
                >
                  {isPending ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="small" color="#fff" />
                      <Text style={[styles.saveButtonText, { marginLeft: 10 }]}>
                        Guardando...
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.buttonContent}>
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={20}
                        color="#fff"
                      />
                      <Text style={[styles.saveButtonText, { marginLeft: 8 }]}>
                        Guardar cambios
                      </Text>
                    </View>
                  )}
                </LinearGradient>
              </Pressable>
            </Animated.View>
          </BottomSheetView>
        </LinearGradient>
      </BottomSheet> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 40,
    alignItems: "center",
    borderBottomRightRadius: ui.radii.xl,
  },

  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: ui.radii.pill,
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
    borderRadius: ui.radii.md,
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
    borderTopLeftRadius: ui.radii.xl,
    borderTopRightRadius: ui.radii.xl,
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

  headerSection: {
    marginBottom: 20,
  },

  iconContainer: {
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },

  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 20,
  },

  fieldWrapper: {
    marginBottom: 20,
  },

  fieldLabel: {
    color: "rgba(255,255,255,0.9)",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },

  fieldBox: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 14,
    borderRadius: ui.radii.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  fieldBoxDisabled: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.06)",
  },

  fieldText: {
    color: "#fff",
    fontSize: 15,
  },

  helperText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    marginTop: 6,
    fontStyle: "italic",
  },

  saveButton: {
    marginTop: 28,
    borderRadius: ui.radii.md,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { height: 4, width: 0 },
    elevation: 5,
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
