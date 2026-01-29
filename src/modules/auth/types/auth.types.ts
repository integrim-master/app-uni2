import { UserData } from "@/src/types/shared/Auth.types";
import {
  MembershipData,
  TratamientoCareme,
} from "@/src/types/shared/Benefits.type";
import { ReactNode } from "react";
import { Promotion } from "../../home/types/promotions.types";

interface MeApiResponse {
  user_data: UserData;
  membership_data: MembershipData;
  treatments_careme: TratamientoCareme[];
  treatments_suggest: TratamientoCareme[];
  promotions: Promotion[];
}

interface AuthContextType {
  token: string | undefined;
  user: UserData | null;
  membership: MembershipData | null;
  treatmentsCareme: TratamientoCareme[];
  loading: boolean;
  login: (
    token: string,
    userData: UserData,
    membershipData: MembershipData,
    treatments: TratamientoCareme[],
    treatments_suggest: TratamientoCareme[],
    promotions: Promotion[],
  ) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (userData: UserData | null) => void;
  updateUserInStorage: (userData: UserData) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export { AuthContextType, AuthProviderProps, MeApiResponse };

