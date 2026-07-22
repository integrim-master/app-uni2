import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { useInfoProfile } from "./useMeProfile";

export function useProfileScreen() {
  const { data: user } = useInfoProfile();
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const userName = user?.nombre || "Usuario";

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    await logout();
  };

  return {
    userName,
    showLogoutConfirm,
    setShowLogoutConfirm,
    handleLogout,
    goToProfileDetails: () => router.push("/profile-details"),
    goToPrivacy: () => router.push("/profile/privacy"),
    contactAdvisor: () => console.log("Contactar asesor"),
  };
}
