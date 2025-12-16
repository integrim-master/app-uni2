import { Screen } from "@/components/shared/Screen";
import React, { useEffect } from "react";
import Blog from "../../../assets/svg/Blog.svg";
import SupportIcon from "../../../assets/svg/support.svg";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import HomeScreen from "../../../modules/home/screens/HomeScreen";
import { ButtonData, CitaData } from "../../../modules/home/types/home.types";
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

  useEffect(() => {
    console.log("User data:", user);
    console.log("Membership data:", membership);
  }, [user]);

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
