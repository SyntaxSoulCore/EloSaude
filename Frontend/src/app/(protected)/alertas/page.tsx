import type { Metadata } from "next";

import { AlertsPage } from "@/features/alerts/components/alerts-page";

export const metadata: Metadata = {
  title: "Alertas",
};

export default function Page() {
  return <AlertsPage />;
}

