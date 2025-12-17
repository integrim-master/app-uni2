import { Screen } from "@/src/components/shared/Screen";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import HomeScreen from "@/src/modules/home/screens/HomeScreen";
import { ButtonData, CitaData } from "@/src/modules/home/types/home.types";
import React from "react";
import Blog from "../../../assets/svg/Blog.svg";
import SupportIcon from "../../../assets/svg/support.svg";
const mockCitas: CitaData[] = [
  {
    id: "1",
    procedimiento: "Limpieza Facial",
    fecha: "2024-12-15",
    hora: "10:00",
    especialista: "García",
    estado: "Confirmada",
  },
  {
    id: "2",
    procedimiento: "Masaje Relajante",
    fecha: "2024-12-20",
    hora: "14:30",
    especialista: "López",
    estado: "Pendiente",
  },
];

export default function Index() {
  const { user, membership } = useAuth();
  const { colors } = useTheme();


  const fullName = "Usuario";

  const dataButtons: ButtonData[] = [
    {
      item: "Blog",
      routPage: "dates",
      icon: Blog,
    },
    {
      item: "Solicitudes",
      routPage: "home/support",
      icon: SupportIcon,
    },
  ];

  return (
    <Screen>
      <HomeScreen
        user={user!}
        fullName={fullName}
        dataButtons={dataButtons}
        mebershipName={membership?.name || ""}
        citas={mockCitas}
        benefits={membership?.benefits || []}
      />
    </Screen>
  );
}
