import { UserData } from "@/src/types/shared/Auth.types";
import { MembershipData } from "@/src/types/shared/Benefits.type";
import { ReactNode } from "react";


interface LoginResponse {
  userData: UserData;
  membership_data: MembershipData;
}

interface MeApiResponse {
  user_data: UserData;
  membership_data: MembershipData;
}

interface AuthContextType {
  token: string | undefined ;
  user: UserData | null;
  membership: MembershipData | null;
  loading: boolean;
  login: (token: string, userData: UserData,membershipData: MembershipData ) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (userData: UserData | null) => void;
  
}

interface AuthProviderProps {
  children: ReactNode;
}

export {
  AuthContextType,
  AuthProviderProps,
  LoginResponse,
  MeApiResponse
};

