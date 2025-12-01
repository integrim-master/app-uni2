import { apiFetch } from "./cliente";

export function sendTokenApi(userId, expoPushToken) {
  return apiFetch(`/careme/v1/register-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, token: expoPushToken }),
  }, token);
}
