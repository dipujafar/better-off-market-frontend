// lib/api/buildQueryString.ts
type ParamValue = string | number | boolean | undefined | null | (string | number)[];

export function buildQueryString(params?: Record<string, ParamValue>): string {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      // e.g. { status: ["active", "pending"] } -> ?status=active,pending
      searchParams.append(key, value.join(","));
    } else {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}