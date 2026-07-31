import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { GC_TIME, STALE_TIME } from "@/src/lib/queryClient";
import { MeService } from "../services/profile.service";
import { UserProfile } from "../types/profile.types";

export const useInfoProfile = () => {
  return useAuthQuery<UserProfile>({
    queryKey: ["profile-info"],
    queryFn: () => MeService.getProfile(),
    staleTime: STALE_TIME.STATIC,
    gcTime: GC_TIME.DEFAULT,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
