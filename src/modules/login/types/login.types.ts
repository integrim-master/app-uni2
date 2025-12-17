import { UserData } from "@/types/shared/Auth.types";
import { MembershipData } from "@/types/shared/Benefits.type";


interface LoginResponse {
  token: string;
  user_data: UserData;
  membership_data: MembershipData;
}


export {
  LoginResponse
};

