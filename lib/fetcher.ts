import { toast } from "@/hooks/use-toast";
import { getToken } from "./token";

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
  const token = await getToken();
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
  const token = await getToken();

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
  const token = await getToken();

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
    toast;
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const uploader = async (
  endpoint: string,
  payload?: any
): Promise<Response> => {
  try {
    const token = await getToken();

    const formData = new FormData();
    formData.append("file", payload);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
      },
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
