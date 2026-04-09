import { ProtectedAppShell } from "@/components/layout/protected-app-shell";
import { ProtectedRoute } from "@/features/auth/components/protected-route";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <ProtectedAppShell>{children}</ProtectedAppShell>
    </ProtectedRoute>
  );
}
