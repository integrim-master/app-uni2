import { ReactNode } from "react";

export type SignInResult = {
  needsTerms: boolean;
};

export interface AuthContextType {
  token: string | undefined;
  /** Restore inicial desde SecureStore */
  loading: boolean;
  /** Login/logout en curso: el root no monta Stack (evita flash) */
  isAuthTransitioning: boolean;
  isAuthenticated: boolean;
  signIn: (
    credentials: { username: string; password: string },
    options?: { pushToken?: string | null },
  ) => Promise<SignInResult>;
  /** Tras aceptar términos (token ya en storage) */
  activateSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
