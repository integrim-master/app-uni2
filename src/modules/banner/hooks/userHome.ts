// src/hooks/useAuthData.ts
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../../login/services/auth.service";

export const userUser = () =>
  useQuery({
    queryKey: ["full-profile"],
    queryFn: AuthService.getMeUser,
    staleTime: Infinity,
    select: (data) => data.user_data,
  });

export const useMembership = () =>
  useQuery({
    queryKey: ["full-profile"],
    queryFn: AuthService.getMeUser,
    staleTime: Infinity,
    select: (data) => data.membership_data,
  });

export const useTreatments = () =>
  useQuery({
    queryKey: ["full-profile"],
    queryFn: AuthService.getMeUser,
    staleTime: Infinity,
    select: (data) => data.treatments_suggest,
  });

export const usePromotions = () =>
  useQuery({
    queryKey: ["full-profile"],
    queryFn: AuthService.getMeUser,
    staleTime: Infinity,
    select: (data) => data.promotions,
  });
