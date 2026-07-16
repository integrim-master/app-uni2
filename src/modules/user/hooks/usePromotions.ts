import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { AuthService } from "@/src/modules/login/services/auth.service";
import { Promotion } from "@/src/modules/home/types/home.promotions.types";
import {
  FULL_PROFILE_KEY,
  MeApiResponse,
  PROFILE_STALE_TIME,
} from "../types/me.types";

export const usePromotions = () =>
  useAuthQuery<MeApiResponse, Error, Promotion[]>({
    queryKey: FULL_PROFILE_KEY,
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
    select: (data) => data.promotions,
  });
