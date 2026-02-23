import { UserData } from "@/src/types/shared/Auth.types";
import {
  MembershipData,
  TratamientoCareme,
} from "@/src/types/shared/Benefits.type";
import { ReactNode } from "react";
import { UltimasCitas } from "../../home/types/home.dates.types";
import { Promotion } from "../../home/types/home.promotions.types";

interface MeApiResponse {
  user_data: UserData;
  membership_data: MembershipData;
  treatments_careme: TratamientoCareme[];
  treatments_suggest: TratamientoCareme[];
  promotions: Promotion[];
  ultimas_citas: UltimasCitas;
}

interface AuthContextType {
  token: string | undefined;
  loading: boolean;
  login: (
    token: string,
    userData: UserData,
    membershipData: MembershipData,
    treatments: TratamientoCareme[],
    treatments_suggest: TratamientoCareme[],
    promotions: Promotion[],
    dates?: UltimasCitas,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export { AuthContextType, AuthProviderProps, MeApiResponse };

