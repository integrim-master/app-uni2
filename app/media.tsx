import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import CardMovies from "@/src/modules/media/components/CardMovies";
import CircleCard from "@/src/shared/CircleCard";
import SimpleCarousel from "@/src/shared/simple-carousel";
import { VideoCard } from "@/src/shared/videoCard";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function MediaScreen() {
  const { colors } = useTheme();

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["38%"], []);

  const openOptions = useCallback((item: any) => {
    setSelectedItem(item);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeOptions = useCallback(() => {
    bottomSheetRef.current?.close();
    setTimeout(() => setSelectedItem(null), 200);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.45}
      />
    ),
    [],
  );

  const openInfoModal = (item: any) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const categories = [
    {
      id: "1",
      title: "Cirugía",
      image: require("../assets/images/campana.jpg"),
    },
    {
      id: "2",
      title: "Diagnóstico",
      image: require("../assets/images/campana.jpg"),
    },
    {
      id: "3",
      title: "Post-Op",
      image: require("../assets/images/campana.jpg"),
    },
    {
      id: "4",
      title: "Estética",
      image: require("../assets/images/campana.jpg"),
    },
  ];

  const trends = [
    {
      id: "1",
      title: "Laparoscopía",
      image: require("../assets/images/campana.jpg"),
    },
    {
      id: "2",
      title: "Reconstrucción",
      image: require("../assets/images/campana.jpg"),
    },
    {
      id: "3",
      title: "Diagnóstico",
      image: require("../assets/images/campana.jpg"),
    },
  ];

  const slides = [
    {
      id: "1",
      title: "Procedimiento Destacado",
      image: require("../assets/images/campana.jpg"),
      duration: "12:34",
      views: "2.5K",
      date: "Hace 3 días",
      description:
        "Una mirada detallada a un procedimiento quirúrgico avanzado.",
      thumbnail: require("../assets/images/campana.jpg"),
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: "2",
      title: "Caso Clínico Real",
      image: require("../assets/images/campana.jpg"),
      duration: "09:20",
      views: "1.2K",
      date: "Hace 2 días",
      description: "Análisis detallado de un caso clínico reciente.",
      thumbnail: require("../assets/images/campana.jpg"),
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
  ];

  return (
    <Screen safeArea={true}>
      <ScrollView
        style={[styles.container]}
        showsVerticalScrollIndicator={false}
      >
        <BackButton />
        <View style={styles.heroSection}>
          <SimpleCarousel
            height={320}
            data={slides}
            openInfoModal={openInfoModal}
          />
        </View>

        <Section title="Categorias">
          <FlatList
            data={trends}
            horizontal
            renderItem={({ item }) => (
              <CircleCard image={item.image} title={item.title} />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </Section>

        <Section title="Últimos videos">
          <FlatList
            data={categories}
            horizontal
            renderItem={({ item }) => (
              <CardMovies item={item} onOpenOptions={openOptions} />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </Section>

        <Section title="Tendencias">
          <FlatList
            data={categories}
            horizontal
            renderItem={({ item }) => (
              <CardMovies item={item} onOpenOptions={openOptions} />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </Section>
      </ScrollView>

      <AnimatePresence>
        {showModal && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
          >
            <MotiView
              from={{ scale: 0.9, translateY: 40 }}
              animate={{ scale: 1, translateY: 0 }}
              exit={{ scale: 0.9, translateY: 40 }}
              transition={{ type: "timing", duration: 300 }}
              style={[styles.modalCard, { backgroundColor: colors.primary }]}
            >
              <VideoCard
                video={selectedItem}
                isActive={false}
                colors={colors}
              />
              <Pressable
                onPress={() => setShowModal(false)}
                style={{ marginTop: 16, alignItems: "center" }}
              >
                <ThemedText type="semiBold" color={colors.primary}>
                  Cerrar
                </ThemedText>
              </Pressable>
            </MotiView>
          </MotiView>
        )}
      </AnimatePresence>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onClose={closeOptions}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.text }}
      >
        <BottomSheetView style={styles.sheet}>
          <AnimatePresence>
            {selectedItem && (
              <MotiView
                key={selectedItem.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 20 }}
                transition={{ type: "timing", duration: 250 }}
                style={{ marginBottom: 16 }}
              >
                <ThemedText type="subtitle" color={colors.text}>
                  {selectedItem.title}
                </ThemedText>

                <SheetItem icon="star-outline" text="Agregar a favoritos" />
                <SheetItem icon="download-outline" text="Descargar" />
                <SheetItem icon="share-social-outline" text="Compartir" />
              </MotiView>
            )}
          </AnimatePresence>
        </BottomSheetView>
      </BottomSheet>
    </Screen>
  );
}

function Section({ title, children }: any) {
  const { colors } = useTheme();
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle" color={colors.text}>
          {title}
        </ThemedText>
        <Pressable onPress={() => router.push("/category" as any)}>
          <ThemedText type="caption" color={colors.primary}>
            Ver todos
          </ThemedText>
        </Pressable>
      </View>
      {children}
    </View>
  );
}

function SheetItem({ icon, text }: any) {
  const { colors } = useTheme();
  return (
    <Pressable style={styles.sheetItem}>
      <Ionicons name={icon} size={20} color={colors.text} />
      <ThemedText type="body" color={colors.text}>
        {text}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroSection: { marginBottom: 20 },
  section: { marginBottom: 24, paddingHorizontal: 16 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  horizontalList: { gap: 12 },

  modalOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: 320,
    padding: 20,
    borderRadius: 16,
  },

  sheet: { flex: 1, padding: 20 },
  sheetItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
  },
});
