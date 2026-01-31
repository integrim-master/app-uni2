import { UserData } from "@/src/types/shared/Auth.types";
import {
  MembershipData,
  TratamientoCareme,
} from "@/src/types/shared/Benefits.type";
import { UltimasCitas } from "../../home/types/home.dates.types";
import { Promotion } from "../../home/types/home.promotions.types";

interface LoginResponse {
  token: string;
  user_data: UserData;
  membership_data: MembershipData;
  tratamientos_careme: TratamientoCareme[];
  treatments_suggest: TratamientoCareme[];
  promotions: Promotion[];
  ultimas_citas: UltimasCitas;
}

interface AcceptTermsResponse {
  user_id: number;
  current_user: {
    data: {
      ID: string;
      user_login: string;
      user_pass: string;
      user_nicename: string;
      user_email: string;
      user_url: string;
      user_registered: string;
      user_activation_key: string;
      user_status: string;
      display_name: string;
    };
    ID: number;
    caps: Record<string, boolean>;
    cap_key: string;
    roles: string[];
    allcaps: Record<string, boolean>;
    filter: null | string;
  };
}

export { AcceptTermsResponse, LoginResponse };

