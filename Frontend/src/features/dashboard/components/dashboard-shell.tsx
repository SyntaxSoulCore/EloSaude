import {
  CalendarRange,
  Eye,
  Filter,
  Info,
  MoreHorizontal,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const metricCards = [
  {
    icon: Eye,
    label: "Pacientes acompanhados",
    value: "12.450",
    trend: "15,8%",
    tone: "positive",
  },
  {
    icon: TrendingUp,
    label: "Receita do período",
    value: "R$ 363,95",
    trend: "34,0%",
    tone: "negative",
  },
  {
    icon: Info,
    label: "Bounce rate clínico",
    value: "86,5%",
    trend: "24,2%",
    tone: "positive",
  },
];

const integrationRows = [
  {
    app: "Stripe",
    type: "Financeiro",
    rate: "40%",
    profit: "R$ 650,00",
  },
  {
    app: "Zapier",
    type: "CRM",
    rate: "80%",
    profit: "R$ 720,50",
  },
  {
    app: "Shopify",
    type: "Marketplace",
    rate: "20%",
    profit: "R$ 432,25",
  },
];

const surfaceCardClass = "rounded-3xl border-outline bg-surface shadow-none";
const toolbarButtonClass =
  "h-10 rounded-xl border-outline bg-surface text-body-secondary hover:bg-subtle hover:text-body";
const compactToolbarButtonClass =
  "h-9 rounded-xl border-outline bg-surface text-body-secondary hover:bg-subtle hover:text-body";

function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
  tone,
}: (typeof metricCards)[number]) {
  const isPositive = tone === "positive";

  return (
    <Card className={surfaceCardClass}>
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-body-secondary">
            <Icon className="size-4" />
            <span>{label}</span>
          </div>
          <Info className="size-4 text-body-muted" />
        </div>
        <div className="flex items-center gap-3">
          <CardTitle className="text-4xl font-semibold tracking-tight text-body">
            {value}
          </CardTitle>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              isPositive
                ? "bg-[color-mix(in_srgb,var(--accent-success)_14%,var(--background))] text-accent-success"
                : "bg-[color-mix(in_srgb,var(--accent-error)_14%,var(--background))] text-accent-error"
            }`}
          >
            {trend}
          </span>
        </div>
      </CardHeader>
    </Card>
  );
}

export function DashboardShell() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-body">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-body-secondary">
            Visão executiva da operação clínica e financeira.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            className={toolbarButtonClass}
          >
            <CalendarRange data-icon="inline-start" />
            Oct 18 - Nov 18
          </Button>
          <Button
            variant="outline"
            className={toolbarButtonClass}
          >
            Mensal
          </Button>
          <Button
            variant="outline"
            className={toolbarButtonClass}
          >
            <Filter data-icon="inline-start" />
            Filtro
          </Button>
          <Button
            variant="outline"
            className={toolbarButtonClass}
          >
            Exportar
          </Button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {metricCards.map((card) => (
          <MetricCard key={card.label} {...card} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.85fr]">
        <Card className={surfaceCardClass}>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardDescription className="text-sm text-body-secondary">
                Sales overview
              </CardDescription>
              <CardTitle className="mt-3 text-5xl font-semibold tracking-tight text-body">
                R$ 9.257,51
              </CardTitle>
              <p className="mt-2 text-sm text-body-secondary">
                15,8% de crescimento e R$ 143,50 acima da meta.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className={compactToolbarButtonClass}
              >
                <Filter data-icon="inline-start" />
                Filtro
              </Button>
              <Button
                variant="outline"
                className={compactToolbarButtonClass}
              >
                <SlidersHorizontal data-icon="inline-start" />
                Ordenar
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-xl border border-outline bg-surface text-body-secondary hover:bg-subtle hover:text-body"
              >
                <MoreHorizontal data-icon="inline-start" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="grid h-[270px] grid-cols-3 items-end gap-6">
              {[
                ["#5b4fd8", "#7d6ef0", "#5f89f0", "#72d6de"],
                ["#5b4fd8", "#7d6ef0", "#5f89f0", "#72d6de"],
                ["#5b4fd8", "#7d6ef0", "#5f89f0", "#72d6de"],
              ].map((palette, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <p className="text-sm font-semibold text-body-secondary">
                    {index === 0 ? "R$ 2.988,20" : index === 1 ? "R$ 1.765,09" : "R$ 4.005,65"}
                  </p>
                  <div className="flex h-full w-full items-end justify-center gap-2">
                    <div className="flex w-full max-w-[108px] flex-col gap-1">
                      {palette.map((color, barIndex) => (
                        <div
                          key={`${index}-${barIndex}`}
                          className="h-7 rounded-xl"
                          style={{
                            background: color,
                            opacity: 1 - barIndex * 0.08,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-body-muted">
                    {index === 0 ? "Oct" : index === 1 ? "Nov" : "Dec"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={surfaceCardClass}>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardDescription className="text-sm text-body-secondary">
                Total subscriber
              </CardDescription>
              <CardTitle className="mt-3 text-5xl font-semibold tracking-tight text-body">
                24,473
              </CardTitle>
              <p className="mt-2 text-sm text-body-secondary">
                8,3% de crescimento e +749 inscrições.
              </p>
            </div>
            <Button
              variant="outline"
              className={compactToolbarButtonClass}
            >
              Semanal
            </Button>
          </CardHeader>

          <CardContent>
            <div className="flex h-[290px] items-end justify-between gap-3">
              {[48, 72, 160, 48, 98, 72, 110].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className={`w-full rounded-2xl ${
                      index === 2 ? "bg-[#6657e8]" : "bg-subtle"
                    }`}
                    style={{ height }}
                  />
                  <span className="text-sm text-body-muted">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className={surfaceCardClass}>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardDescription className="text-sm text-body-secondary">
                Sales distribution
              </CardDescription>
              <CardTitle className="mt-2 text-3xl font-semibold tracking-tight text-body">
                R$ 829,84
              </CardTitle>
            </div>
            <Button
              variant="outline"
              className={compactToolbarButtonClass}
            >
              Mensal
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-4 text-sm">
                <div className="rounded-2xl bg-page px-4 py-3">
                  <p className="text-body-secondary">Website</p>
                  <p className="mt-1 text-2xl font-semibold text-body">R$ 374,82</p>
                </div>
                <div className="rounded-2xl bg-page px-4 py-3">
                  <p className="text-body-secondary">Mobile app</p>
                  <p className="mt-1 text-2xl font-semibold text-body">R$ 241,60</p>
                </div>
                <div className="rounded-2xl bg-page px-4 py-3">
                  <p className="text-body-secondary">Outros</p>
                  <p className="mt-1 text-2xl font-semibold text-body">R$ 213,42</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative size-56 rounded-full bg-[conic-gradient(#6657e8_0_34%,#69d0d7_34%_58%,#e8ecf5_58%_100%)]">
                  <div className="absolute inset-6 rounded-full bg-surface" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={surfaceCardClass}>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardDescription className="text-sm text-body-secondary">
                List of integration
              </CardDescription>
              <CardTitle className="mt-2 text-3xl font-semibold tracking-tight text-body">
                Integrações ativas
              </CardTitle>
            </div>
            <Button variant="link" className="px-0 text-[#6657e8]">
              Ver todas
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr] gap-4 border-b border-outline pb-3 text-xs font-semibold uppercase tracking-[0.12em] text-body-muted">
              <span>Aplicação</span>
              <span>Tipo</span>
              <span>Rate</span>
              <span>Profit</span>
            </div>

            <div className="divide-y divide-outline">
              {integrationRows.map((row) => (
                <div
                  key={row.app}
                  className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr] items-center gap-4 py-4 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-page text-xs font-semibold text-body-secondary">
                      {row.app.slice(0, 1)}
                    </div>
                    <span className="font-medium text-body">{row.app}</span>
                  </div>
                  <span className="text-body-secondary">{row.type}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-subtle">
                      <div
                        className="h-2 rounded-full bg-[#6657e8]"
                        style={{
                          width: row.rate,
                        }}
                      />
                    </div>
                    <span className="text-body-secondary">{row.rate}</span>
                  </div>
                  <span className="font-medium text-body-secondary">{row.profit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
