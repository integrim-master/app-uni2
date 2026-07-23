import { ReactNode } from "react";

export interface AuthContextType {
  token: string | undefined;
  loading: boolean;
  isAuthenticated: boolean;
  /** Persiste el token y lo deja listo para las queries autenticadas. */
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
