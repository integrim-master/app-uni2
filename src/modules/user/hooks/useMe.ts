import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { AuthService } from "@/src/modules/login/services/auth.service";
import {
  FULL_PROFILE_KEY,
  MeApiResponse,
  PROFILE_STALE_TIME,
} from "../types/me.types";

export const useMe = () => {
  return useAuthQuery<MeApiResponse>({
    queryKey: FULL_PROFILE_KEY,
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
  });
};

/** Alias legacy — preferir useMe */
export const useMeUser = useMe;
