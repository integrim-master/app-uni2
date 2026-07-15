import { AuthService } from "@/src/modules/login/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { FULL_PROFILE_KEY, PROFILE_STALE_TIME } from "../types/me.types";

export const useTreatments = () =>
  useQuery({
    queryKey: FULL_PROFILE_KEY,
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
    select: (data) => data.treatments_careme,
  });
