import { Text } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export const TextIntro = ({ style, children, className, ...props }) => (
    <Text className={`text-4xl ${className}`} {...props} style={[{fontFamily: "poppins-regular"}, style]}>
        {children}
    </Text>
)

export const TextTitles = ({ style, children, className, ...props }) => (

  <Text
    {...props}
    allowFontScaling={false}
    style={[{ fontFamily: "poppins-regular" }, style]}
    className={`text-2xl text-black ${className}`}
  >
    {children}
  </Text>
)

export const TextSubTitles = ({ style, children, className, ...props }) => (
    <Text style={[{fontFamily: "poppins-regular"}, style]} className={`text-xl ${className}`} {...props} >
        {children}
    </Text>
)

export const TextContent = ({ style, children, className, ...props }) => (
    <Text style={[{fontFamily: "poppins-regular"}, style]} className={`text-base ${className}`} {...props} >
        {children}
    </Text>
)

export const TextSmall = ({ style, children, className, ...props }) => (
    <Text style={[{fontFamily: "poppins-regular"}, style]} className={`text-sm ${className}`} {...props} >
        {children}
    </Text>
)

export const TextTiny = ({ style, children, className, ...props }) => (
    <Text style={[{fontFamily: "poppins-regular"}, style]} className={`text-xs ${className}`} {...props} >
        {children}
    </Text>
)

export const TextMix = ({ style, children, className, ...props }) => (
    <Text style={[{fontFamily: "poppins-regular"}, style]} className={`${className}`} {...props} >
        {children}
    </Text>
)
