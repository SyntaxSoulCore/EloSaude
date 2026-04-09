"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { AlertCircle, ArrowRight, LoaderCircle, LockKeyhole, Mail } from "lucide-react";

import { APP_ROUTES } from "@/constants/routes";
import { loginWithMockAccount, registerMockAccount } from "@/features/auth/services/mock-auth.service";
import { type AuthMode, type RegisterPayload } from "@/features/auth/types/auth.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFormProps = {
  mode: AuthMode;
};

type FormState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);

  const isLogin = mode === "login";

  const linkConfig = isLogin
    ? {
        href: APP_ROUTES.register,
        label: "Criar conta",
        helper: "Ainda não tem acesso?",
      }
    : {
        href: APP_ROUTES.login,
        label: "Voltar para login",
        helper: "Já possui cadastro?",
      };

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function validateForm() {
    if (!form.email.trim() || !form.password.trim()) {
      return "Preencha e-mail e senha para continuar.";
    }

    if (!isLogin) {
      if (!form.fullName.trim()) {
        return "Informe seu nome completo.";
      }

      if (form.password.length < 6) {
        return "A senha precisa ter ao menos 6 caracteres.";
      }

      if (form.password !== form.confirmPassword) {
        return "As senhas não coincidem.";
      }
    }

    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    startTransition(() => {
      const result = isLogin
        ? loginWithMockAccount({
            email: form.email,
            password: form.password,
          })
        : registerMockAccount({
            fullName: form.fullName,
            email: form.email,
            password: form.password,
          } satisfies RegisterPayload);

      if (!result.success) {
        setError(result.message);
        return;
      }

      router.replace(APP_ROUTES.dashboard);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {!isLogin ? (
          <div className="grid gap-2">
            <Label htmlFor="fullName">Nome completo</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Seu nome"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              autoComplete="name"
              className="h-11 rounded-xl border-border bg-background shadow-none"
            />
          </div>
        ) : null}

        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-body-muted" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="voce@elosaude.com"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              autoComplete="email"
              className="h-11 rounded-xl border-border bg-background pl-10 shadow-none"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            {isLogin ? (
              <button
                type="button"
                className="ml-auto text-sm font-medium text-primary transition-opacity hover:opacity-80"
              >
                Recuperar acesso
              </button>
            ) : null}
          </div>

          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-body-muted" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="h-11 rounded-xl border-border bg-background pl-10 shadow-none"
            />
          </div>
        </div>

        {!isLogin ? (
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repita sua senha"
              value={form.confirmPassword}
              onChange={(event) => updateField("confirmPassword", event.target.value)}
              autoComplete="new-password"
              className="h-11 rounded-xl border-border bg-background shadow-none"
            />
          </div>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-[color-mix(in_srgb,var(--accent-error)_20%,transparent)] bg-[color-mix(in_srgb,var(--accent-error)_10%,var(--background))] px-4 py-3 text-sm leading-6 text-accent-error"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <Button type="submit" className="mt-1 h-11 w-full rounded-xl" disabled={isPending}>
          {isPending ? (
            <LoaderCircle className="animate-spin" data-icon="inline-start" />
          ) : (
            <ArrowRight data-icon="inline-end" />
          )}
          {isLogin ? "Entrar no sistema" : "Criar conta"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-body-secondary">{linkConfig.helper} </span>
        <Link
          href={linkConfig.href}
          className="font-semibold text-primary transition-opacity hover:opacity-80"
        >
          {linkConfig.label}
        </Link>
      </div>
    </div>
  );
}
