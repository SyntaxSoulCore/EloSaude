import Link from "next/link";
import Image from "next/image";
import { Activity, ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { APP_ROUTES } from "@/constants/routes";
import { ThemeToggle } from "@/components/shared/theme-toggle";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

const authHighlights = [
  {
    icon: ShieldCheck,
    label: "Acesso seguro para pacientes e profissionais com evolução contínua do cuidado.",
  },
  {
    icon: Activity,
    label: "Experiência pensada para acompanhar sinais, alertas e adesão ao tratamento.",
  },
];

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <section className="relative z-10 flex flex-col gap-6 p-6 md:p-10">
        <div className="flex items-center justify-between gap-4">
          <Link href={APP_ROUTES.home} className="flex items-center gap-3 font-medium text-body">
            <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-surface shadow-sm dark:border-white/10 dark:bg-white/5">
              <Image
                src="/images/Logo-EloSaude-light.png"
                alt="Logo EloSaúde"
                width={48}
                height={48}
                className="h-auto w-auto dark:hidden"
                priority
              />
              <Image
                src="/images/Logo-EloSaude-dark.png"
                alt="Logo EloSaúde"
                width={48}
                height={48}
                className="hidden h-auto w-auto dark:block"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold">EloSaúde</span>
              <span className="text-sm text-body-secondary">Conectando você ao seu bem-estar</span>
            </div>
          </Link>

          <ThemeToggle className="rounded-lg" variant="icon" />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="relative z-10 w-full max-w-lg">
            <div className="mb-8 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600">{eyebrow}</p>
              <h1 className="text-3xl font-semibold leading-tight text-balance text-body">{title}</h1>
              <p className="text-base leading-7 text-body-secondary">{description}</p>
            </div>

            <Card className="border-none bg-transparent shadow-none">{children}</Card>

            <div className="mt-8 grid gap-3">
              {authHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border px-4 py-3 text-sm text-body-secondary"
                  >
                    <div className="rounded-lg p-2 text-primary-600 shadow-sm">
                      <Icon className="size-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative hidden overflow-hidden bg-muted lg:block">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgb(34_197_94_/_0.16),_transparent_26%),radial-gradient(circle_at_left,_rgb(30_111_214_/_0.18),_transparent_34%)] dark:bg-[radial-gradient(circle_at_top_right,_rgb(34_197_94_/_0.14),_transparent_28%),radial-gradient(circle_at_left,_rgb(30_111_214_/_0.3),_transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/Banner-EloSaude-light.png.png"
            alt="Banner EloSaúde"
            width={1400}
            height={900}
            className="absolute inset-0 h-full w-full object-cover dark:hidden"
            priority
          />
          <Image
            src="/images/Banner-EloSaude-dark.png"
            alt="Banner EloSaúde"
            width={1400}
            height={900}
            className="absolute inset-0 hidden h-full w-full object-cover dark:block"
            priority
          />
          <div className="absolute inset-0 bg-white/8 dark:bg-black/18" />
        </div>
      </section>
    </main>
  );
}
