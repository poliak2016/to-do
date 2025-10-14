const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(path, option = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(option.headers || {})
    }
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('API request failed:', res);
    throw new Error(text || res.statusText);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}
export const api = {
  get: (p) => request(p, { method: 'GET' }),
  post: (p, b) => request(p, { method: 'POST', body: JSON.stringify(b) }),
  patch: (p, b) => request(p, { method: 'PATCH', body: JSON.stringify(b) }),
  put: (p, b) => request(p, { method: 'PUT', body: JSON.stringify(b) }),
  del: (p) => request(p, { method: 'DELETE' }),
}

