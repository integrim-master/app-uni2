import { useAuthQuery } from "@/src/modules/auth/hooks/useAuthQuery";
import { AuthService } from "@/src/modules/auth/services/auth.service";
import { MembershipData } from "@/src/types/shared/Benefits.type";
import {
  FULL_PROFILE_KEY,
  MeApiResponse,
  PROFILE_STALE_TIME,
} from "../types/me.types";

export const useMembership = () =>
  useAuthQuery<MeApiResponse, Error, MembershipData>({
    queryKey: FULL_PROFILE_KEY,
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
    select: (data) => data.membership_data,
  });
