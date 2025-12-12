export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch(path, { method = "GET", body, token, headers = {} } = {}) {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  if (token) opts.headers["Authorization"] = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_URL}${path}`, opts);
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const error = data?.message || data?.msg || res.statusText;
    throw new Error(error || "Error en la petición");
  }
  return data;
}