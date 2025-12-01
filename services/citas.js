import { apiFetch } from "./cliente";

export function getCitasApi(userId, token, limit=null){
    let url = `/careme/v1/citas?user_id=${userId}`;
    if(limit) url += `&limit=${limit}`;
    return apiFetch(url, {}, token)
}