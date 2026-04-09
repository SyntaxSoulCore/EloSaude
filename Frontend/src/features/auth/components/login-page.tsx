import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { redirectIfAuthenticated } from "@/features/auth/services/server-auth.service";

export async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <AuthShell
      eyebrow="Acesso seguro"
      title="Entre para acompanhar sua jornada de cuidado."
      description="Use seu e-mail e senha para acessar seu painel, acompanhar alertas e manter sua rotina de cuidado organizada."
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
