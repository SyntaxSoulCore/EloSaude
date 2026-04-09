import { ChevronRight, type LucideIcon } from "lucide-react";

type AppPagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryMetric: string;
  primaryMetricLabel: string;
  secondaryMetric: string;
  secondaryMetricLabel: string;
  icon: LucideIcon;
  nextSteps: string[];
};

export function AppPagePlaceholder({
  eyebrow,
  title,
  description,
  primaryMetric,
  primaryMetricLabel,
  secondaryMetric,
  secondaryMetricLabel,
  icon: Icon,
  nextSteps,
}: AppPagePlaceholderProps) {
  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-lg border border-outline bg-surface p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-body-muted">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-body">
              {title}
            </h1>
            <p className="mt-4 text-sm leading-7 text-body-secondary">
              {description}
            </p>
          </div>

          <div className="flex size-12 items-center justify-center rounded-lg border border-outline text-body">
            <Icon className="size-5" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-outline bg-surface p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-body-muted">
            {primaryMetricLabel}
          </p>
          <p className="mt-6 text-4xl font-semibold tracking-tight text-body">
            {primaryMetric}
          </p>
        </div>

        <div className="rounded-lg border border-outline bg-surface p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-body-muted">
            {secondaryMetricLabel}
          </p>
          <p className="mt-6 text-4xl font-semibold tracking-tight text-body">
            {secondaryMetric}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-outline bg-surface p-6">
        <div className="border-b border-outline pb-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-body-muted">
            Próximos passos
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-body">
            Estrutura pronta para aprofundar o módulo.
          </h2>
        </div>

        <div className="mt-5 space-y-4">
          {nextSteps.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 border-b border-outline pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-outline text-body">
                <ChevronRight className="size-4" />
              </div>
              <p className="text-sm leading-6 text-body-secondary">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
