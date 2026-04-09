import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { redirectIfAuthenticated } from "@/features/auth/services/server-auth.service";

export async function RegisterPage() {
  await redirectIfAuthenticated();

  return (
    <AuthShell
      eyebrow="Primeiro acesso"
      title="Crie sua conta e centralize seu cuidado em um único lugar."
      description="Cadastre-se para acessar seus acompanhamentos, receber lembretes importantes e visualizar sua evolução com clareza."
    >
      <AuthForm mode="register" />
    </AuthShell>
  );
}
