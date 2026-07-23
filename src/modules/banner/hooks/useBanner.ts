import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { BannerService } from "../services/banner.service";
import { BannerMedia } from "../types/banner.type";

export const useBanner = () => {
  return useAuthQuery<BannerMedia>({
    queryKey: ["banner"],
    queryFn: () => BannerService.getBanner(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
