import { apiFetch } from "./cliente";

export function loginApi(username, password) {
    return apiFetch("/jwt-auth/v1/token", {
        method: "POST",
        body: JSON.stringify({username, password}),
    })
}

export function meApi(token) {
    return apiFetch("/careme/v1/me", {}, token)
}