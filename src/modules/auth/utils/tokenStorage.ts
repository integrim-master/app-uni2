import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_KEY } from "../constants";

/** Soporta token plano o formato legacy `{ token: string }`. */
export function parseStoredToken(raw: string): string {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "token" in parsed &&
      typeof (parsed as { token: unknown }).token === "string"
    ) {
      return (parsed as { token: string }).token;
    }
  } catch {
    // Token guardado como string plano
  }
  return raw;
}

export async function getStoredToken(): Promise<string | null> {
  const raw = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  if (!raw) return null;
  return parseStoredToken(raw);
}

export async function saveStoredToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

export async function removeStoredToken(): Promise<void> {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}
