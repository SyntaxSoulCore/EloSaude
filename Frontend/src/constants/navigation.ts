import {
  Activity,
  BellRing,
  CalendarClock,
  Ellipsis,
  LayoutDashboard,
  LifeBuoy,
  MessageSquareMore,
  Settings,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { APP_ROUTES } from "@/constants/routes";

export type AppNavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type AppNavigationSection = {
  label: string;
  icon: LucideIcon;
  href?: string;
  items?: AppNavigationItem[];
  defaultOpen?: boolean;
};

export const APP_PRIMARY_NAVIGATION: AppNavigationSection[] = [
  {
    label: "Dashboard",
    href: APP_ROUTES.dashboard,
    icon: LayoutDashboard,
  },
  {
    label: "Cuidado clínico",
    icon: Activity,
    defaultOpen: true,
    items: [
      {
        href: APP_ROUTES.patients,
        label: "Pacientes",
        icon: UsersRound,
      },
      {
        href: APP_ROUTES.monitoring,
        label: "Monitoramento",
        icon: Activity,
      },
      {
        href: APP_ROUTES.alerts,
        label: "Alertas",
        icon: BellRing,
      },
    ],
  },
  {
    label: "Configurações",
    href: APP_ROUTES.settings,
    icon: Settings,
  },
];

export const APP_MODULE_NAVIGATION: AppNavigationItem[] = [
  {
    href: APP_ROUTES.schedule,
    label: "Agenda",
    icon: CalendarClock,
  },
  {
    href: APP_ROUTES.patients,
    label: "Pacientes",
    icon: UsersRound,
  },
  {
    href: APP_ROUTES.alerts,
    label: "Alertas",
    icon: BellRing,
  },
  {
    href: APP_ROUTES.settings,
    label: "Mais",
    icon: Ellipsis,
  },
];

export const APP_SUPPORT_NAVIGATION: AppNavigationItem[] = [
  {
    href: APP_ROUTES.settings,
    label: "Suporte",
    icon: LifeBuoy,
  },
  {
    href: APP_ROUTES.settings,
    label: "Feedback",
    icon: MessageSquareMore,
  },
];

export const APP_ALL_ROUTE_ITEMS: AppNavigationItem[] = [
  ...APP_PRIMARY_NAVIGATION.flatMap((item) => item.items ?? (item.href ? [{ href: item.href, label: item.label, icon: item.icon }] : [])),
  ...APP_MODULE_NAVIGATION,
  ...APP_SUPPORT_NAVIGATION,
];
