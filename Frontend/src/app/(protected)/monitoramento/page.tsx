import type { Metadata } from "next";

import { MonitoringPage } from "@/features/monitoring/components/monitoring-page";

export const metadata: Metadata = {
  title: "Monitoramento",
};

export default function Page() {
  return <MonitoringPage />;
}

