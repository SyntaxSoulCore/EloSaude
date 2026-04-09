"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore, useTransition } from "react";
import { Bell, Gift, Menu, PlusCircle, Search } from "lucide-react";

import { APP_ROUTES } from "@/constants/routes";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getCurrentSessionAccount, logoutMockAccount } from "@/features/auth/services/mock-auth.service";

type ProtectedAppShellProps = {
  children: React.ReactNode;
};

function HeaderActionButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-9 rounded-xl border border-outline bg-surface text-body-secondary hover:bg-subtle hover:text-body"
      aria-label={label}
      title={label}
    >
      {children}
    </Button>
  );
}

export function ProtectedAppShell({ children }: ProtectedAppShellProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const account = useSyncExternalStore(
    () => () => undefined,
    getCurrentSessionAccount,
    () => null,
  );

  const accountName = account?.fullName ?? "Equipe ÉloSaúde";
  const accountEmail = account?.email ?? "demo@elosaude.com";

  function handleLogout() {
    startTransition(() => {
      logoutMockAccount();
      router.replace(APP_ROUTES.login);
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-page text-body">
      <div className="grid min-h-screen lg:grid-cols-[250px_minmax(0,1fr)] lg:grid-rows-[72px_minmax(0,1fr)]">
        <div className="hidden items-center justify-between border-b border-r border-outline bg-surface px-5 lg:flex">
          <Link href={APP_ROUTES.dashboard} className="flex items-center gap-3">
            <Image
              src="/images/Logo-EloSaude-light.png"
              alt="Logo ÉloSaúde"
              width={28}
              height={28}
              className="h-7 w-7 rounded-lg dark:hidden"
              priority
            />
            <Image
              src="/images/Logo-EloSaude-dark.png"
              alt="Logo ÉloSaúde"
              width={28}
              height={28}
              className="hidden h-7 w-7 rounded-lg dark:block"
              priority
            />
            <span className="text-2xl font-semibold tracking-tight text-primary-600 dark:text-primary-700">
              ÉloSaúde
            </span>
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 rounded-xl border border-outline text-body-muted hover:bg-subtle hover:text-body"
          >
            <Menu data-icon="inline-start" />
            <span className="sr-only">Alternar sidebar</span>
          </Button>
        </div>

        <header className="flex items-center gap-3 border-b border-outline bg-surface px-4 lg:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="size-9 rounded-xl border border-outline bg-surface text-body-secondary hover:bg-subtle hover:text-body"
            >
              <Menu data-icon="inline-start" />
              <span className="sr-only">Abrir navegação</span>
            </Button>

            <Link href={APP_ROUTES.dashboard} className="flex items-center gap-2">
              <Image
                src="/images/Logo-EloSaude-light.png"
                alt="Logo ÉloSaúde"
                width={24}
                height={24}
                className="h-6 w-6 rounded-lg dark:hidden"
                priority
              />
              <Image
                src="/images/Logo-EloSaude-dark.png"
                alt="Logo ÉloSaúde"
                width={24}
                height={24}
                className="hidden h-6 w-6 rounded-lg dark:block"
                priority
              />
              <span className="text-lg font-semibold tracking-tight text-primary-600 dark:text-primary-700">
                ÉloSaúde
              </span>
            </Link>
          </div>

          <div className="hidden max-w-md flex-1 lg:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-body-muted" />
              <Input
                placeholder="Buscar no sistema"
                className="h-11 rounded-xl border-outline bg-page pl-10 pr-16 text-sm text-body shadow-none placeholder:text-body-muted focus-visible:bg-surface"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-xs font-medium text-body-muted md:inline">
                ⌘ + F
              </span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <HeaderActionButton label="Presentes">
              <Gift data-icon="inline-start" />
            </HeaderActionButton>
            <HeaderActionButton label="Notificações">
              <Bell data-icon="inline-start" />
            </HeaderActionButton>
            <HeaderActionButton label="Novo">
              <PlusCircle data-icon="inline-start" />
            </HeaderActionButton>

            <ThemeToggle
              variant="icon"
              className="size-9 rounded-xl border border-outline bg-surface text-body-secondary hover:bg-subtle hover:text-body"
            />

            <Separator orientation="vertical" className="mx-1 hidden h-8 bg-outline md:block" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-11 gap-3 rounded-2xl border border-outline bg-surface px-2.5 hover:bg-subtle"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--primary-100),var(--secondary-100))] text-xs font-semibold text-body">
                    {accountName.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-semibold text-body">{accountName}</p>
                    <p className="text-xs text-body-secondary">Área clínica</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex flex-col items-start gap-0.5">
                    <span className="text-sm font-semibold text-body">{accountName}</span>
                    <span className="text-xs text-body-secondary">{accountEmail}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>Encerrar sessão</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        <main className="overflow-auto bg-page p-4 lg:p-6">{children}</main>
      </div>

      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-[280px] border-r border-outline bg-surface p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navegação</SheetTitle>
            <SheetDescription>Menu principal do ÉloSaúde.</SheetDescription>
          </SheetHeader>
          <AppSidebar onNavigate={() => setIsMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
