import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/constants/routes";
import { AUTH_COOKIE_NAME } from "@/features/auth/utils/auth-storage";

export async function getServerSessionEmail() {
  const cookieStore = await cookies();
  const value = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  return value ? decodeURIComponent(value) : null;
}

export async function redirectIfAuthenticated() {
  const sessionEmail = await getServerSessionEmail();

  if (sessionEmail) {
    redirect(APP_ROUTES.dashboard);
  }
}

export async function requireAuth() {
  const sessionEmail = await getServerSessionEmail();

  if (!sessionEmail) {
    redirect(APP_ROUTES.login);
  }
}

