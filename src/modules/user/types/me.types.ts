import { STALE_TIME } from "@/src/lib/queryClient";
import { UserData } from "@/src/types/shared/Auth.types";
import {
  MembershipData,
  TratamientoCareme,
} from "@/src/types/shared/Benefits.type";
import { UltimasCitas } from "@/src/modules/home/types/home.dates.types";
import { Promotion } from "@/src/modules/home/types/home.promotions.types";

export interface MeApiResponse {
  user_data: UserData;
  membership_data: MembershipData;
  treatments_careme: TratamientoCareme[];
  treatments_suggest: TratamientoCareme[];
  promotions: Promotion[];
  ultimas_citas: UltimasCitas;
}

export const FULL_PROFILE_KEY = ["full-profile"] as const;
export const PROFILE_STALE_TIME = STALE_TIME.MEDIUM;
