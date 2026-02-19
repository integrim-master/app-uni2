import { useQuery } from "@tanstack/react-query";
import { MeService } from "../services/profile.service";
import { UserProfile } from "../types/profile.types";

export const useInfoProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ["profile-info"],
    queryFn: () => MeService.getProfile(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
