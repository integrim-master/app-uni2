import { useAuth } from "@/src/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { MeApiResponse } from "../../auth/types/auth.types";
import { AuthService } from "../services/auth.service";

export const useMeUser = () => {
  const { token } = useAuth() || {};
  return useQuery<MeApiResponse>({
    queryKey: ["full-profile"],
    queryFn: AuthService.getMeUser,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};
