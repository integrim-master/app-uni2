import { useQuery } from "@tanstack/react-query";
import { BannerService } from "../services/banner.service";
import { BannerMedia } from "../types/banner.type";

export const useBanner = () => {
  return useQuery<BannerMedia>({
    queryKey: ["banner"],
    queryFn: () => BannerService.getBanner(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
