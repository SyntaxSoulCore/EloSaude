import type { Metadata } from "next";

import { RegisterPage } from "@/features/auth/components/register-page";

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function Page() {
  return <RegisterPage />;
}
