import { requireAuth } from "@/features/auth/services/server-auth.service";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export async function ProtectedRoute({ children }: ProtectedRouteProps) {
  await requireAuth();

  return children;
}

