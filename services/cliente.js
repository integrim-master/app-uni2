const API_URL = 'https://c699d7206b68.ngrok-free.app/wp-json'

export async function apiFetch(endpoint, options={}, token = null){
    const headers = {
        ...(token ? { authorization: `Bearer ${token}`} : {})
    }
      if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if(!res.ok) {   
        throw new Error(`Error ${res.status}: ${await res.text()}`);
    }

    return await res.json();
}