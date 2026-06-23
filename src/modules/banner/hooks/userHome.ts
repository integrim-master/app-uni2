import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../../login/services/auth.service";
const PROFILE_STALE_TIME = 1000 * 60 * 5;
export const useUser = () =>
  useQuery({
    queryKey: ["full-profile"],
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
    select: (data) => data.user_data,
  });
export const useMembership = () =>
  useQuery({
    queryKey: ["full-profile"],
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
    select: (data) => data.membership_data,
  });
export const useTreatments = () =>
  useQuery({
    queryKey: ["full-profile"],
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
    select: (data) => data.treatments_careme,
  });
export const useTreatmentSuggest = () =>
  useQuery({
    queryKey: ["full-profile"],
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
    select: (data) => data.treatments_suggest,
  });
export const usePromotions = () =>
  useQuery({
    queryKey: ["full-profile"],
    queryFn: AuthService.getMeUser,
    staleTime: PROFILE_STALE_TIME,
    select: (data) => data.promotions,
  });
