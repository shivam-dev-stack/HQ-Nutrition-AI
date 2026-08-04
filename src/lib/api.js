export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access")
        : null;

    const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      body:
        options.body && typeof options.body !== "string"
          ? JSON.stringify(options.body)
          : options.body,
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        data: null,
        error: result?.detail || "Request failed",
      };
    }

    return { data: result as T, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: err.message,
    };
  }
}