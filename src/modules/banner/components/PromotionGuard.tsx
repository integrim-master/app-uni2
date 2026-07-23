import { BannerModal } from "@/src/components/Banner";
import { useAuth } from "@/src/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useBanner } from "../hooks/useBanner";
import { BannerMedia } from "../types/banner.type";

export function PromotionGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [showPromo, setShowPromo] = useState(false);
  const [promoData, setPromoData] = useState<BannerMedia | null>(null);
  const { data } = useBanner();

  useEffect(() => {
    const checkPromo = async () => {
      if (!isAuthenticated || !data) return;

      const promoVisto = await AsyncStorage.getItem("promo_visto");
      if (!promoVisto) {
        setPromoData(data);
        setShowPromo(true);
      }
    };

    void checkPromo();
  }, [isAuthenticated, data]);

  const handleClose = async () => {
    setShowPromo(false);
    await AsyncStorage.setItem("promo_visto", "true");
  };

  return (
    <>
      {children}
      {showPromo && promoData && (
        <BannerModal
          visible={showPromo}
          bannerData={promoData}
          onClose={handleClose}
        />
      )}
    </>
  );
}
