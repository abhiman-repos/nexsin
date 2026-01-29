import { getAccessToken } from "./session";

const API_BASE = "http://localhost:8080";

export async function fetchMe() {
  const token = await getAccessToken();

  const res = await fetch(`${API_BASE}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}
