// lib/api/fetcher.ts
import { getServerToken } from "./getToken";
import { buildQueryString } from "./buildQueryString";
import { envConfig } from "@/config";

type ParamValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | (string | number)[];

interface ApiGetOptions {
  params?: Record<string, ParamValue>;
  revalidate?: number | false;
  tags?: string[];
  timeoutMs?: number;
}

export async function apiGet<T>(
  endpoint: string,
  options: ApiGetOptions = {},
): Promise<T | null> {
  const { params, revalidate = 60, tags = [], timeoutMs = 15000 } = options;

  const token = await getServerToken();
  const queryString = buildQueryString(params);
  const url = `${envConfig.baseUrl}${endpoint}${queryString}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: {  tags },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`GET ${endpoint} failed: ${res.status}`);
      return null;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.error(`GET ${endpoint} returned non-JSON response`);
      return null;
    }

    const body = await res.json();
    return body as T;
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.error(`GET ${endpoint} error:`, err?.message || err);
    return null; // server down, network error, timeout — all silently return null
  }
}