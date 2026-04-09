import Link from "next/link";
import Image from "next/image";

import { APP_ROUTES } from "@/constants/routes";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Card, CardContent } from "@/components/ui/card";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#f4f6fb] p-4 dark:bg-[#0c111b] sm:p-6">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6">
        <Link href={APP_ROUTES.home} className="flex items-center gap-3 font-medium text-body">
          <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm dark:border-white/10 dark:bg-white/5">
            <Image
              src="/images/Logo-EloSaude-light.png"
              alt="Logo ÉloSaúde"
              width={44}
              height={44}
              className="h-auto w-auto dark:hidden"
              priority
            />
            <Image
              src="/images/Logo-EloSaude-dark.png"
              alt="Logo ÉloSaúde"
              width={44}
              height={44}
              className="hidden h-auto w-auto dark:block"
              priority
            />
          </div>
          <div className="hidden sm:flex sm:flex-col">
            <span className="text-base font-semibold">ÉloSaúde</span>
            <span className="text-sm text-body-secondary">Conectando você ao seu bem-estar</span>
          </div>
        </Link>

        <ThemeToggle className="rounded-lg" variant="icon" />
      </div>

      <div className="w-full max-w-6xl pt-16 sm:pt-20">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden border-border bg-background shadow-[0_30px_90px_rgb(15_23_42_/_0.12)] dark:bg-background">
            <CardContent className="grid p-0 md:grid-cols-[0.94fr_1.06fr]">
              <section className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <div className="mb-8 flex flex-col gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600">{eyebrow}</p>
                  <h1 className="text-3xl font-semibold leading-tight text-balance text-body">{title}</h1>
                  <p className="text-base leading-7 text-body-secondary">{description}</p>
                </div>

                {children}
              </section>

              <section className="relative hidden min-h-155 overflow-hidden bg-muted md:block">
                <Image
                  src="/images/Banner-EloSaude.png"
                  alt="Painel ÉloSaúde"
                  width={1672}
                  height={941}
                  className="flex flex-1 w-full h-full object-cover dark:block"
                  priority
                />
              </section>
            </CardContent>
          </Card>

          <p className="text-balance text-center text-xs text-body-muted">
            Ao continuar, você concorda com os termos de uso e com a política de privacidade do ÉloSaúde.
          </p>
        </div>
      </div>
    </main>
  );
}
