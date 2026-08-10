import { cookies } from "next/headers";

const TOKEN_KEY = "betteroffmarket-access-token";

export async function getServerToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value;
}