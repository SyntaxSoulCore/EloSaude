import type { Metadata } from "next";

import { ThemeScript } from "@/components/shared/theme-script";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EloSaúde",
    template: "%s | EloSaúde",
  },
  description:
    "Plataforma digital para acompanhamento clínico, monitoramento e conexão entre médicos e pacientes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
