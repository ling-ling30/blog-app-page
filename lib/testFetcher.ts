export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
type ErrorResponse = {
  error: string;
};

export const fetcher = async <T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> => {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const response = await fetch(`${API_BASE_URL}${endpoint}${queryString}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const authenticatedFetcher = async <T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> => {
  const token = localStorage.getItem("token");
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const response = await fetch(`${API_BASE_URL}${endpoint}${queryString}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const poster = async <T>(endpoint: string, data: any): Promise<T> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const putter = async <T>(endpoint: string, data: any): Promise<T> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
