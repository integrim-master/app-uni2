// import { useTheme } from "@/src/context/ThemeContext";
// import HeaderGradient from "@/src/ui/HeaderGradient";
// import { Stack } from "expo-router";
// import React from "react";

// export default function HomeLayout() {
//   const { colors } = useTheme();

//   return (
//     <Stack
//       screenOptions={{
//         headerShown: true,
//         headerTitleAlign: "center",
//         headerTintColor: "white",
//         headerShadowVisible: false,
//         headerBlurEffect: "systemChromeMaterial",
//         header: ({ navigation, options, back }) => (
//           <HeaderGradient
//             title={options.title as string}
//             back={options.headerBackVisible === true}
//           />
//         ),
//       }}
//     >
//       <Stack.Screen
//         name="index"
//         options={{
//           title: "Beneficios",
//           headerShown: true,
//         }}
//       />
//       <Stack.Screen
//         name="[id_benefits]/index"
//         options={{
//           title: "Tus solicitudes",
//           headerShadowVisible: false,
//         }}
//       />
//     </Stack>
//   );
// }
