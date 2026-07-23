import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { AuthService } from "@/src/modules/login/services/auth.service";
import { TratamientoCareme } from "@/src/types/shared/Benefits.type";
import {
  FULL_PROFILE_KEY,
  MeApiResponse,
  PROFILE_STALE_TIME,
} from "../types/me.types";

export const useTreatmentSuggest = () =>
  useAuthQuery<MeApiResponse, Error, TratamientoCareme[]>({
    queryKey: FULL_PROFILE_KEY,
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
    select: (data) => data.treatments_suggest,
  });
