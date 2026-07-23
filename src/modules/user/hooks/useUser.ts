import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { AuthService } from "@/src/modules/login/services/auth.service";
import { UserData } from "@/src/types/shared/Auth.types";
import {
  FULL_PROFILE_KEY,
  MeApiResponse,
  PROFILE_STALE_TIME,
} from "../types/me.types";

export const useUser = () =>
  useAuthQuery<MeApiResponse, Error, UserData>({
    queryKey: FULL_PROFILE_KEY,
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
    select: (data) => data.user_data,
  });
