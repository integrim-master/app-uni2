import { useAuth } from "@/src/context/AuthContext";
import { AuthService } from "@/src/modules/login/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import {
  FULL_PROFILE_KEY,
  MeApiResponse,
  PROFILE_STALE_TIME,
} from "../types/me.types";

/** Query completa de full-profile (requiere token). */
export const useMe = () => {
  const { token } = useAuth();
  return useQuery<MeApiResponse>({
    queryKey: FULL_PROFILE_KEY,
    queryFn: AuthService.getMeUser,
    enabled: !!token,
    staleTime: PROFILE_STALE_TIME,
  });
};

/** Alias legacy — preferir useMe */
export const useMeUser = useMe;
