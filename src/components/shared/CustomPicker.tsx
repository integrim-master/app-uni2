import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";
import { MotiView } from "moti";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ListRenderItem,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Item = { l: string; v: string };

interface Props {
  label: string;
  selectedValue: string;
  onValueChange: (value: string, index?: number) => void;
  items: Item[];
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
}

/**
 * Android: dropdown nativo (`Picker`).
 * iOS: fila tappable + bottom sheet con lista agrupada (HIG).
 */
export default function CustomPicker({
  label,
  selectedValue,
  onValueChange,
  items,
  visible = true,
  style,
  placeholder,
}: Props) {
  if (!visible) return null;

  if (Platform.OS === "ios") {
    return (
      <IosPickerSheet
        label={label}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        items={items}
        style={style}
        placeholder={placeholder}
      />
    );
  }

  return (
    <AndroidNativePicker
      label={label}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      items={items}
      style={style}
      placeholder={placeholder}
    />
  );
}

function AndroidNativePicker({
  label,
  selectedValue,
  onValueChange,
  items,
  style,
  placeholder,
}: Omit<Props, "visible">) {
  const { colors } = useTheme();
  const emptyLabel = placeholder ?? `Selecciona ${label.toLowerCase()}...`;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={[
        styles.field,
        style,
        { borderColor: selectedValue ? colors.primary : colors.border },
      ]}
    >
      <ThemedText type="caption" tone="secondary" style={styles.fieldLabel}>
        {label}
      </ThemedText>

      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{ color: colors.text, marginLeft: -ui.spacing.sm }}
        dropdownIconColor={colors.primary}
      >
        <Picker.Item
          label={emptyLabel}
          value=""
          color={colors.textSecondary}
        />
        {items.map((item) => (
          <Picker.Item
            key={item.v}
            label={item.l}
            value={item.v}
            color={colors.text}
          />
        ))}
      </Picker>
    </MotiView>
  );
}

function IosPickerSheet({
  label,
  selectedValue,
  onValueChange,
  items,
  style,
  placeholder,
}: Omit<Props, "visible">) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);

  const emptyLabel = placeholder ?? `Selecciona ${label.toLowerCase()}...`;
  const selectedLabel = useMemo(
    () => items.find((item) => item.v === selectedValue)?.l,
    [items, selectedValue],
  );
  const hasValue = Boolean(selectedValue && selectedLabel);

  const close = useCallback(() => setOpen(false), []);

  const select = useCallback(
    (value: string) => {
      onValueChange(value);
      setOpen(false);
    },
    [onValueChange],
  );

  const renderItem: ListRenderItem<Item> = useCallback(
    ({ item, index }) => {
      const selected = item.v === selectedValue;
      const isLast = index === items.length - 1;

      return (
        <Pressable
          onPress={() => select(item.v)}
          accessibilityRole="button"
          accessibilityState={{ selected }}
          accessibilityLabel={item.l}
          style={({ pressed }) => [
            styles.optionRow,
            {
              backgroundColor: pressed
                ? `${colors.primary}12`
                : "transparent",
            },
          ]}
        >
          <View
            style={[
              styles.optionInner,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: isLast ? 0 : ui.borders.hairline,
              },
            ]}
          >
            <ThemedText
              type={selected ? "semiBold" : "body"}
              tone={selected ? "accent" : "default"}
              style={styles.optionLabel}
              numberOfLines={2}
            >
              {item.l}
            </ThemedText>

            <View
              style={[
                styles.checkWrap,
                {
                  backgroundColor: selected
                    ? colors.primary
                    : "transparent",
                  borderColor: selected
                    ? colors.primary
                    : colors.borderLight,
                },
              ]}
            >
              {selected ? (
                <Ionicons name="checkmark" size={14} color={colors.backgroundElevated} />
              ) : null}
            </View>
          </View>
        </Pressable>
      );
    },
    [colors, items.length, select, selectedValue],
  );

  return (
    <>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
        style={[
          styles.field,
          style,
          { borderColor: hasValue ? colors.primary : colors.border },
        ]}
      >
        <ThemedText type="caption" tone="secondary" style={styles.fieldLabel}>
          {label}
        </ThemedText>

        <Pressable
          onPress={() => setOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityHint="Abre la lista de opciones"
          style={styles.trigger}
        >
          <ThemedText
            type="titleSm"
            tone={hasValue ? "default" : "secondary"}
            numberOfLines={1}
            style={styles.triggerValue}
          >
            {hasValue ? selectedLabel : emptyLabel}
          </ThemedText>
          <View
            style={[
              styles.chevronChip,
              { backgroundColor: `${colors.primary}18` },
            ]}
          >
            <Ionicons name="chevron-down" size={16} color={colors.primary} />
          </View>
        </Pressable>
      </MotiView>

      <Modal
        visible={open}
        transparent
        animationType="none"
        presentationStyle="overFullScreen"
        statusBarTranslucent
        onRequestClose={close}
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.backdropHit}
            onPress={close}
            accessibilityRole="button"
            accessibilityLabel="Cerrar selector"
          >
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 220 }}
              style={StyleSheet.absoluteFill}
            >
              <BlurView
                tint="dark"
                intensity={28}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.backdropDim} />
            </MotiView>
          </Pressable>

          <MotiView
            from={{ translateY: 56, opacity: 0.98 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: "timing", duration: 280 }}
            style={[
              styles.sheet,
              {
                backgroundColor: colors.background,
                shadowColor: colors.shadow,
                paddingBottom: Math.max(insets.bottom, ui.spacing.lg),
              },
            ]}
          >
            <View style={styles.handleWrap}>
              <View
                style={[styles.handle, { backgroundColor: colors.borderLight }]}
              />
            </View>

            <View style={styles.sheetHeader}>
              <Pressable
                onPress={close}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Cancelar"
                style={styles.headerSide}
              >
                <ThemedText type="body" tone="secondary">
                  Cancelar
                </ThemedText>
              </Pressable>

              <ThemedText
                type="semiBold"
                align="center"
                numberOfLines={1}
                style={styles.sheetTitle}
              >
                {label}
              </ThemedText>

              <View style={styles.headerSide} />
            </View>

            <ThemedText
              type="caption"
              tone="muted"
              align="center"
              style={styles.sheetHint}
            >
              Elige una opción de la lista
            </ThemedText>

            {items.length === 0 ? (
              <View
                style={[
                  styles.group,
                  styles.empty,
                  { backgroundColor: colors.backgroundElevated },
                ]}
              >
                <ThemedText type="body" tone="secondary" align="center">
                  No hay opciones disponibles.
                </ThemedText>
              </View>
            ) : (
              <View
                style={[
                  styles.group,
                  { backgroundColor: colors.backgroundElevated },
                ]}
              >
                <FlatList
                  data={items}
                  keyExtractor={(item) => item.v}
                  renderItem={renderItem}
                  bounces={items.length > 8}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  style={styles.list}
                  contentContainerStyle={styles.listContent}
                />
              </View>
            )}
          </MotiView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: ui.spacing.xl,
    borderBottomWidth: ui.borders.width,
    paddingBottom: ui.spacing.xs,
  },
  fieldLabel: {
    marginBottom: ui.spacing.xs,
  },
  trigger: {
    minHeight: ui.tapTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ui.spacing.sm,
    paddingVertical: ui.spacing.sm,
  },
  triggerValue: {
    flex: 1,
  },
  chevronChip: {
    width: 28,
    height: 28,
    borderRadius: ui.radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdropHit: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    maxHeight: "78%",
    borderTopLeftRadius: ui.radii.xl,
    borderTopRightRadius: ui.radii.xl,
    paddingTop: ui.spacing.xs,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.28,
    shadowRadius: 24,
    elevation: 16,
  },
  handleWrap: {
    alignItems: "center",
    paddingTop: ui.spacing.sm,
    paddingBottom: ui.spacing.sm,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: ui.radii.pill,
    opacity: 0.9,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ui.spacing.lg,
    minHeight: ui.tapTarget,
  },
  headerSide: {
    width: 72,
    justifyContent: "center",
  },
  sheetTitle: {
    flex: 1,
  },
  sheetHint: {
    marginTop: ui.spacing.xs,
    marginBottom: ui.spacing.md,
    paddingHorizontal: ui.spacing.xl,
  },
  group: {
    marginHorizontal: ui.spacing.lg,
    marginBottom: ui.spacing.sm,
    borderRadius: ui.radii.lg,
    overflow: "hidden",
    maxHeight: 420,
  },
  list: {
    maxHeight: 420,
  },
  listContent: {
    paddingVertical: ui.spacing.xs,
  },
  optionRow: {
    minHeight: ui.tapTarget,
  },
  optionInner: {
    minHeight: ui.tapTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ui.spacing.md,
    marginLeft: ui.spacing.lg,
    paddingRight: ui.spacing.lg,
    paddingVertical: ui.spacing.md,
  },
  optionLabel: {
    flex: 1,
  },
  checkWrap: {
    width: 22,
    height: 22,
    borderRadius: ui.radii.pill,
    borderWidth: ui.borders.width,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    paddingHorizontal: ui.spacing.xl,
    paddingVertical: ui.spacing.xxl,
  },
});
