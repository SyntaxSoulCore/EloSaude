"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSyncExternalStore, useTransition } from "react";
import {
  Activity,
  BellRing,
  CalendarClock,
  ChevronRight,
  HeartPulse,
  LogOut,
  Pill,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { APP_ROUTES } from "@/constants/routes";
import {
  getCurrentSessionAccount,
  logoutMockAccount,
} from "@/features/auth/services/mock-auth.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const overviewCards = [
  {
    title: "Pacientes monitorados",
    value: "18",
    description: "Base mock para o primeiro sprint",
    icon: UsersRound,
  },
  {
    title: "Alertas ativos",
    value: "04",
    description: "Itens que exigem atenção clínica",
    icon: BellRing,
  },
  {
    title: "Adesão a medicação",
    value: "92%",
    description: "Indicador consolidado do período",
    icon: Pill,
  },
];

const roadmapCards = [
  {
    title: "Linha do tempo clínica",
    description: "Centralizar medições, sintomas e eventos relevantes por paciente.",
    icon: HeartPulse,
  },
  {
    title: "Agenda e lembretes",
    description: "Ligar consultas, horários de medicação e alertas preventivos.",
    icon: CalendarClock,
  },
  {
    title: "Segurança e governança",
    description: "Preparar trilha para autenticação real, perfis e permissões.",
    icon: ShieldCheck,
  },
];

export function DashboardShell() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const account = useSyncExternalStore(
    () => () => undefined,
    getCurrentSessionAccount,
    () => null
  );

  const accountName = account?.fullName ?? "Profissional";
  const accountEmail = account?.email ?? "demo@elosaude.com";

  function handleLogout() {
    startTransition(() => {
      logoutMockAccount();
      router.replace(APP_ROUTES.login);
      router.refresh();
    });
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="overflow-hidden rounded-lg border border-white/60 bg-[#07111e] p-6 text-white shadow-[0_24px_90px_rgb(7_17_30_/_0.28)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex size-[84px] items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5">
                <Image
                  src="/images/Logo-EloSaude-dark.png"
                  alt="Logo EloSaúde"
                  width={84}
                  height={84}
                  className="h-auto w-auto"
                  priority
                />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-primary-200">
                    Painel inicial
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold text-balance">
                    Olá, {accountName}.
                  </h1>
                </div>
                <p className="max-w-2xl text-base leading-7 text-white/[0.72]">
                  Autenticação mock ativa para <strong>{accountEmail}</strong>. Esta
                  é a base protegida do sistema, pronta para receber os módulos
                  clínicos e o backend real.
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleLogout}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              <LogOut data-icon="inline-start" />
              Sair
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {overviewCards.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="rounded-lg border border-white/60 bg-card/90 shadow-[0_18px_60px_rgb(7_17_30_/_0.08)] dark:border-border/70 dark:bg-card"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <CardDescription>{item.title}</CardDescription>
                    <CardTitle className="mt-3 text-4xl">{item.value}</CardTitle>
                  </div>
                  <div className="rounded-lg bg-primary-50 p-3 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
                    <Icon className="size-5" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-sm leading-6 text-body-secondary">
                  {item.description}
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-lg border border-white/60 bg-card/90 shadow-[0_18px_60px_rgb(7_17_30_/_0.08)] dark:border-border/70 dark:bg-card">
            <CardHeader>
              <CardDescription>Próxima entrega</CardDescription>
              <CardTitle className="text-2xl">
                Estrutura pronta para crescer sem refazer a autenticação.
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {roadmapCards.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-lg border border-border/70 bg-muted/45 p-4 dark:bg-muted/70"
                  >
                    <div className="rounded-lg bg-surface p-3 text-primary-700 shadow-sm dark:bg-surface dark:text-primary-200">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-body">{item.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-body-secondary">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="mt-1 size-5 text-body-muted" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-white/60 bg-[linear-gradient(180deg,#ffffff_0%,#f4fbfa_100%)] shadow-[0_18px_60px_rgb(7_17_30_/_0.08)] dark:border-border/70 dark:bg-[linear-gradient(180deg,#111827_0%,#0b1220_100%)]">
            <CardHeader>
              <CardDescription>Status do ambiente</CardDescription>
              <CardTitle className="text-2xl">
                Auth mock funcionando e rotas internas protegidas.
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm leading-6 text-body-secondary">
              <div className="rounded-lg border border-border/70 bg-surface/75 p-4 dark:bg-surface">
                <div className="flex items-center gap-3 text-body">
                  <Activity className="size-5 text-primary-600" />
                  <span className="font-semibold">Login por e-mail e senha</span>
                </div>
                <p className="mt-2">
                  Sem login social, com persistência local e redirecionamento para o
                  dashboard.
                </p>
              </div>

              <div className="rounded-lg border border-border/70 bg-surface/75 p-4 dark:bg-surface">
                <div className="flex items-center gap-3 text-body">
                  <ShieldCheck className="size-5 text-primary-600" />
                  <span className="font-semibold">Rotas privadas</span>
                </div>
                <p className="mt-2">
                  O grupo protegido exige sessão ativa antes de renderizar qualquer
                  tela interna.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
