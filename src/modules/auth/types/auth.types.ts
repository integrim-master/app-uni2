import { ReactNode } from "react";

export interface AuthContextType {
  token: string | undefined;
  loading: boolean;
  /** Solo persiste el token. El perfil se hidrata en React Query desde el caller. */
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
