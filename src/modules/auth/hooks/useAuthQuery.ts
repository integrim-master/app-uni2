import { useAuth } from "@/src/context/AuthContext";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { ApiError } from "../utils/apiError";

type AuthQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey,
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "enabled"
> & {
  enabled?: boolean;
};

export function useAuthenticated() {
  const { token, loading } = useAuth();

  return {
    token,
    isAuthenticated: !!token && !loading,
    isAuthLoading: loading,
  };
}

/** Query que solo se ejecuta con sesión activa y restaurada. */
export function useAuthQuery<
  TQueryFnData = unknown,
  TError = ApiError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: AuthQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> {
  const { isAuthenticated } = useAuthenticated();
  const { enabled = true, ...queryOptions } = options;

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...queryOptions,
    enabled: isAuthenticated && enabled,
  });
}
