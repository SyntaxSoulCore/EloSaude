"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellRing,
  CalendarClock,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  MessageSquareMore,
  ShieldCheck,
  Stethoscope,
  UsersRound,
  Workflow,
} from "lucide-react";

import { APP_ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

type NavigationItem = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
};

type NavigationSection = {
  label: string;
  items: NavigationItem[];
};

const navigationSections: NavigationSection[] = [
  {
    label: "GERAL",
    items: [
      {
        href: APP_ROUTES.dashboard,
        icon: LayoutDashboard,
        label: "Dashboard",
      },
      {
        href: APP_ROUTES.patients,
        icon: UsersRound,
        label: "Pacientes",
      },
      {
        href: APP_ROUTES.monitoring,
        icon: Workflow,
        label: "Monitoramento",
      },
      {
        href: APP_ROUTES.alerts,
        icon: MessageSquareMore,
        label: "Mensagens",
        badge: "8",
      },
    ],
  },
  {
    label: "CUIDADO",
    items: [
      {
        href: APP_ROUTES.schedule,
        icon: CalendarClock,
        label: "Agenda",
      },
      {
        href: APP_ROUTES.alerts,
        icon: BellRing,
        label: "Alertas",
      },
      {
        href: APP_ROUTES.settings,
        icon: CreditCard,
        label: "Faturamento",
      },
      {
        href: APP_ROUTES.settings,
        icon: Stethoscope,
        label: "Automação",
      },
    ],
  },
  {
    label: "SUPORTE",
    items: [
      {
        href: APP_ROUTES.settings,
        icon: Workflow,
        label: "Configurações",
      },
      {
        href: APP_ROUTES.settings,
        icon: ShieldCheck,
        label: "Segurança",
      },
      {
        href: APP_ROUTES.settings,
        icon: HelpCircle,
        label: "Ajuda",
      },
    ],
  },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === APP_ROUTES.dashboard) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarItem({
  item,
  pathname,
  onNavigate,
}: {
  item: NavigationItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const isActive = isActiveRoute(pathname, item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
        isActive ? "bg-subtle text-body" : "text-body-secondary hover:bg-subtle hover:text-body",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className={cn("size-4 shrink-0", isActive ? "text-body" : "text-body-muted")} />
      <span className="truncate">{item.label}</span>
      {item.badge ? (
        <span className="ml-auto rounded-full bg-page px-2 py-0.5 text-[11px] font-semibold text-body-secondary group-hover:bg-surface">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

export function AppSidebar({ className, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex h-full flex-col border-r border-outline bg-surface", className)}>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="flex flex-col gap-6">
          {navigationSections.map((section) => (
            <section key={section.label} className="flex flex-col gap-2">
              <p className="px-3 text-[11px] font-semibold tracking-[0.14em] text-body-muted">{section.label}</p>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <SidebarItem
                    key={`${section.label}-${item.label}`}
                    item={item}
                    pathname={pathname}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="border-t border-outline px-3 py-4">
        <div className="rounded-2xl bg-page p-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--primary-100),var(--secondary-100))] text-sm font-semibold text-body">
              ES
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-body">Equipe ÉloSaúde</p>
              <p className="truncate text-xs text-body-secondary">Workspace clínico</p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="mt-3 h-9 w-full justify-center rounded-xl border-outline bg-surface text-body-secondary hover:bg-subtle hover:text-body"
          >
            Área premium
          </Button>
        </div>

        <p className="mt-4 text-center text-[11px] text-body-muted">© 2026 ÉloSaúde</p>
      </div>
    </aside>
  );
}
