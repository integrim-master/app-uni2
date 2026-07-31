import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { GC_TIME, STALE_TIME } from "@/src/lib/queryClient";
import { BannerService } from "../services/banner.service";
import { BannerMedia } from "../types/banner.type";

export const useBanner = () => {
  return useAuthQuery<BannerMedia>({
    queryKey: ["banner"],
    queryFn: () => BannerService.getBanner(),
    staleTime: STALE_TIME.STATIC,
    gcTime: GC_TIME.DEFAULT,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
