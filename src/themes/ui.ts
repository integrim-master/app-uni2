import { StyleSheet } from "react-native";

/**
 * Design tokens — escala de 4pt.

 * Mapa: 4→xs | 8→sm | 12→md | 16→lg | 24→xl | 32→xxl
 */
export const ui = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 999,
  },
  borders: {
    width: 1,
    hairline: StyleSheet.hairlineWidth,
  },
  /** Tamaño mínimo de área táctil (iOS HIG / Material). */
  tapTarget: 44,
} as const;
