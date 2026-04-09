import type { Metadata } from "next";

import { SchedulePage } from "@/features/schedule/components/schedule-page";

export const metadata: Metadata = {
  title: "Agenda",
};

export default function Page() {
  return <SchedulePage />;
}

