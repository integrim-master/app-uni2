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
}


export const LightTheme: ThemeColors = {
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
  backgroundSecondary: "#F3F4F6", // Fondo secundario
  text: "#6B7280", // Texto negro
  textLight: "#6B7280", // Texto gris
  textDark: "#1F2937", // Texto gris oscuro
  textSecondary: "#9CA3AF", // Texto secundario
  border: "#E5E7EB", // Borde gris claro
  borderLight: "#F3F4F6", // Borde muy claro
  card: "white", 
  shadow: "#000000", // Sombra negra
};

// Paleta de Modo Oscuro - Negro, Gris y Dorado
export const DarkTheme: ThemeColors = {
  primary: "#D4AF37", 
  primaryLight: "#E8C066", // Dorado claro
  primaryDark: "#B38E2C", // Dorado oscuro
  secondary: "#FFB22C", // Naranja dorado
  secondaryLight: "#FFC966",
  secondaryDark: "#CC8E1F",
  success: "#10B981", // Verde éxito más oscuro
  successLight: "#34D399",
  successDark: "#059669",
  danger: "#DC2626", // Rojo peligro más oscuro
  dangerLight: "#EF4444",
  dangerDark: "#991B1B",
  warning: "#F59E0B", // Amarillo advertencia
  warningLight: "#FBBF24",
  warningDark: "#D97706",
  background: "#0F0F0F", // Fondo negro profundo
  backgroundLight: "#1A1A1A", // Fondo gris muy oscuro
  backgroundDark: "#050505", // Fondo negro puro
  backgroundSecondary: "#262626", // Fondo secundario gris oscuro
  text: "#F9FAFB", // Texto blanco
  textLight: "#D1D5DB", // Texto gris claro
  textDark: "#E5E7EB", // Texto gris muy claro
  textSecondary: "#9CA3AF", // Texto secundario
  border: "#374151", // Borde gris medio
  borderLight: "#4B5563", // Borde gris claro
  card: "#1F1F1F", // Tarjetas gris oscuro
  shadow: "#000000", // Sombra negra
};

// Para compatibilidad con código existente
export const Colors = LightTheme;
