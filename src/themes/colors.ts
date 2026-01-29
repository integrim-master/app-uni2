export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  success: string;
  successLight: string;
  successDark: string;
  danger: string;
  dangerLight: string;
  dangerDark: string;
  warning: string;
  warningLight: string;
  warningDark: string;
  background: string;
  backgroundLight: string;
  backgroundDark: string;
  backgroundSecondary: string;
  text: string;
  textLight: string;
  textDark: string;
  textSecondary: string;
  border: string;
  borderLight: string;
  card: string;
  shadow: string;
  blue: string;
  textPrimary: string;
  textSecondaryDorado?: string;
  gradientBackground: [string, string, string];
  gradientCard: [string, string];
  cardTextDark: string;
  gradientCardStart: string;
  gradientCardEnd: string;
  membershipSilverGradient?: [string, string, string];
  membershipSilverCard?: string;
  membershipSilverText?: string;
  membershipGoldGradient: [string, string, string];
  membershipBlackGradient: [string, string, string];
  membershipBlackCard?: string;
  membershipBlackText?: string;
}

export const LightTheme: ThemeColors = {
  cardTextDark: "#694610",
  primary: "#D4AF37",
  primaryLight: "#E8C066", // Dorado claro
  primaryDark: "#B38E2C", // Dorado oscuro
  secondary: "#FFB22C", // Naranja vibrante
  secondaryLight: "#FFC966",
  secondaryDark: "#CC8E1F", // Naranja oscuro
  success: "#22C55E", // Verde éxito
  successLight: "#4ADE80", // Verde claro
  successDark: "#16A34A", // Verde oscuro

  danger: "#EF4444", // Rojo peligro
  dangerLight: "#F87171", // Rojo claro
  dangerDark: "#B91C1C", // Rojo oscuro
  warning: "#F59E0B", // Amarillo advertencia
  warningLight: "#FBBF24", // Amarillo claro
  warningDark: "#D97706", // Amarillo oscuro
  background: "#F3F4F6", // Fondo blanco
  backgroundLight: "#F9FAFB", // Fondo gris muy claro
  backgroundDark: "#E5E7EB", // Fondo gris claro
  backgroundSecondary: "#fffbe6", // Fondo secundario
  text: "#6B7280", // Texto negro
  textLight: "#6B7280", // Texto gris
  textDark: "#1F2937", // Texto gris oscuro
  textSecondary: "#9CA3AF", // Texto secundario
  textPrimary: "#E5BE83", // Texto dorado
  textSecondaryDorado: "#D4AF37", // Texto dorado claro
  border: "#E5E7EB", // Borde gris claro
  borderLight: "#F3F4F6", // Borde muy claro
  card: "white",
  gradientBackground: ["#F3F4F6", "#E5E7EB", "#E5E7EB"],
  gradientCard: ["#FFFFFF", "#F9FAFB"],

  gradientCardStart: "#FFFFFF",
  gradientCardEnd: "#F9FAFB",
  membershipGoldGradient: ["#E8C066", "#D4AF37", "#D0993C"],
  membershipBlackGradient: ["#222227", "#171517", "#0F0F0F"],
  shadow: "#000000", // Sombra negra
  blue: "#668CE8",
};

// Paleta de Modo Oscuro - Negro, Gris y Dorado
export const DarkTheme: ThemeColors = {
  cardTextDark: "#694610",
  primary: "#E2B155",
  primaryLight: "#E5BE83",
  primaryDark: "#B38E2C",
  secondary: "#FFB22C",
  secondaryLight: "#FFC966",
  membershipSilverGradient: ["#E3E3E3", "#BEBEBE", "#A7A7A7"],
  membershipSilverCard: "#F5F5F5",
  membershipSilverText: "black",
  secondaryDark: "#CC8E1F",
  success: "#10B981",
  successLight: "#34D399",
  successDark: "#059669",
  danger: "#DC2626",
  dangerLight: "#EF4444",
  dangerDark: "#991B1B",
  warning: "#F59E0B",
  warningLight: "#FBBF24",
  warningDark: "#D97706",
  background: "#0F0F0F",
  backgroundLight: "#1A1A1A",
  backgroundDark: "#302D34",
  backgroundSecondary: "#262626",
  gradientBackground: ["#302D34", "#272526", "#1E1E1C"],
  gradientCard: ["#222222", "#393335"],
  text: "#F9FAFB",
  textLight: "#D1D5DB",
  textDark: "#E5E7EB",
  textSecondary: "#9CA3AF",
  border: "#374151",
  borderLight: "#4B5563",
  card: "#1F1F1F",
  shadow: "#000000",
  blue: "#668CE8",
  textPrimary: "#E5BE83",
  textSecondaryDorado: "#D4AF37",
  gradientCardStart: "#222222",
  gradientCardEnd: "#393335",

  membershipGoldGradient: ["#E5BE83", "#E2B155", "#D0993C"],
  membershipBlackGradient: ["#1F1F1F", "#262626", "#121212"],
  membershipBlackCard: "#111111",
  membershipBlackText: "#F9FAFB",
};

// Para compatibilidad con código existente
export const Colors = LightTheme;
