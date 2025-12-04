import { ReactNode } from "react";

interface UserData {
  id: string;
  display_name: string;
  email: string;
  ciudad?: string;
  telefono?: string;
  identificacion?: string;
  [key: string]: any; 
}

interface MembershipData {
  id: string;
  name: string;
  colors: {
    color1: string;
    color2: string;
    color3: string;
  };
  [key: string]: any; 
}

interface LoginResponse {
  token: string;
}

interface MeApiResponse {
  user_data: UserData;
  membership_data: MembershipData;
}

interface AuthContextType {
  token: string | null;
  user: UserData | null;
  membership: MembershipData | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadAuth: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  updateUser: (data: Partial<UserData>) => Promise<any>;
  setLoading: (loading: boolean) => void;
  applicationBenefit: (procedimientoLabel: string, procedimiento: string) => Promise<any>;
}

interface AuthProviderProps {
  children: ReactNode;
}


export {
    AuthContextType,
    AuthProviderProps, LoginResponse,
    MeApiResponse, MembershipData, UserData
};

