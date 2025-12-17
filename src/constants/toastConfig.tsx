import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";
import { DarkTheme } from "../themes/colors";

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: DarkTheme.success,
        backgroundColor: DarkTheme.card,
        borderRadius: 12,
        shadowColor: DarkTheme.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "700",
        color: DarkTheme.text,
      }}
      text2Style={{
        fontSize: 13,
        color: DarkTheme.textSecondary,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: DarkTheme.primaryDark,
        backgroundColor: DarkTheme.card,
        borderRadius: 12,
        shadowColor: DarkTheme.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "700",
        color: DarkTheme.text,
      }}
      text2Style={{
        fontSize: 13,
        color: DarkTheme.textSecondary,
      }}
    />
  ),
};
