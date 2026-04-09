import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/constants/routes";
import { getServerSessionEmail } from "@/features/auth/services/server-auth.service";

export async function AuthEntryRedirect() {
  const sessionEmail = await getServerSessionEmail();

  if (sessionEmail) {
    redirect(APP_ROUTES.dashboard);
  }

  redirect(APP_ROUTES.login);

  return null;
}
