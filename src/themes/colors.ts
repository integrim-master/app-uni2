export interface AppThemeColors {
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
  backgroundElevated: string;
  backgroundSurface: string;
  backgroundSecondary: string;
  backgroundHeader: string;

  gradientBackground: [string, string, string];
  gradientCard: [string, string];

  text: string;
  textMuted: string;
  textStrong: string;
  textSecondary: string;
  textAccent: string;
  textGold: string;

  card: string;
  cardText: string;

  border: string;
  borderLight: string;

  shadow: string;
  blue: string;

  membershipGold: [string, string, string];
  membershipBlack: [string, string, string];
  membershipBlackCard: string;
  membershipBlackText: string;
  membershipSilver: [string, string, string];
  membershipSilverCard: string;
  membershipSilverText: string;
}

export const AppColors: AppThemeColors = {
  // --- Brand ---
  primary: "#E2B155",
  primaryLight: "#E5BE83",
  primaryDark: "#B38E2C",

  // --- Accent ---
  secondary: "#FFB22C",
  secondaryLight: "#FFC966",
  secondaryDark: "#CC8E1F",

  // --- Status ---
  success: "#10B981",
  successLight: "#34D399",
  successDark: "#059669",
  danger: "#DC2626",
  dangerLight: "#EF4444",
  dangerDark: "#991B1B",
  warning: "#F59E0B",
  warningLight: "#FBBF24",
  warningDark: "#D97706",

  // --- Backgrounds ---
  background: "#0F0F0F",
  backgroundElevated: "#1A1A1A",
  backgroundSurface: "#302D34",
  backgroundSecondary: "#262626",
  backgroundHeader: "#302D34",

  // --- Gradients ---
  gradientBackground: ["#302D34", "#272526", "#1E1E1C"],
  gradientCard: ["#222222", "#393335"],

  // --- Text ---
  text: "#F9FAFB",
  textMuted: "#D1D5DB",
  textStrong: "#E5E7EB",
  textSecondary: "#9CA3AF",
  textAccent: "#E5BE83",
  textGold: "#D4AF37",

  // --- Cards ---
  card: "#1F1F1F",
  cardText: "#694610",

  // --- Borders ---
  border: "#3d3d3d",
  borderLight: "#4B5563",

  // --- Misc ---
  shadow: "#000000",
  blue: "#668CE8",

  // --- Memberships ---
  membershipGold: ["#E5BE83", "#E2B155", "#D0993C"],
  membershipBlack: ["#1F1F1F", "#262626", "#121212"],
  membershipBlackCard: "#111111",
  membershipBlackText: "#F9FAFB",
  membershipSilver: ["#E3E3E3", "#BEBEBE", "#A7A7A7"],
  membershipSilverCard: "#F5F5F5",
  membershipSilverText: "black",
};

/** @deprecated Usa AppColors directamente o useTheme() */
export type ThemeColors = AppThemeColors;
/** @deprecated Usa AppColors directamente o useTheme() */
export const DarkTheme = AppColors;
/** @deprecated Usa AppColors directamente o useTheme() */
export const LightTheme = AppColors;
/** @deprecated Usa AppColors directamente o useTheme() */
export const Colors = AppColors;
