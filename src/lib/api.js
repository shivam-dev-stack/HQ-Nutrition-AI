// src/lib/api.ts

export async function apiRequest<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;

    const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const result = await response.json().catch(() => null);

    // HTTP Error Catching
    if (!response.ok) {
      // 401 Unauthorized handling
      if (response.status === 401 && typeof window !== "undefined") {
        localStorage.removeItem("access");
        window.location.href = "/login";
      }

      return { 
        data: null, 
        error: result?.detail || `Server returned error ${response.status}` 
      };
    }

    return { data: result as T, error: null };

  } catch (err: any) {
    // Network / Offline Error Catching
    return { 
      data: null, 
      error: err.message || "Network error, backend server reach nahi ho pa raha." 
    };
  }
}