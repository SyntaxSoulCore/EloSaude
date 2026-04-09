import {
  type AuthResult,
  type LoginPayload,
  type MockAccount,
  type RegisterPayload,
} from "@/features/auth/types/auth.type";
import { AUTH_ACCOUNTS_STORAGE_KEY, AUTH_COOKIE_NAME } from "@/features/auth/utils/auth-storage";

const DEFAULT_ACCOUNT: MockAccount = {
  id: "default-demo-account",
  fullName: "Equipe ÉloSaúde",
  email: "demo@elosaude.com",
  password: "123456",
  createdAt: "2026-04-09T00:00:00.000Z",
};

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getStoredAccounts() {
  if (!isBrowser()) {
    return [DEFAULT_ACCOUNT];
  }

  const rawValue = window.localStorage.getItem(AUTH_ACCOUNTS_STORAGE_KEY);

  if (!rawValue) {
    return [DEFAULT_ACCOUNT];
  }

  try {
    const parsed = JSON.parse(rawValue) as MockAccount[];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [DEFAULT_ACCOUNT];
    }

    return parsed;
  } catch {
    return [DEFAULT_ACCOUNT];
  }
}

function saveAccounts(accounts: MockAccount[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(AUTH_ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

function persistSession(email: string) {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(
    email,
  )}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function loginWithMockAccount({ email, password }: LoginPayload): AuthResult {
  const normalizedEmail = normalizeEmail(email);
  const accounts = getStoredAccounts();
  const account = accounts.find((item) => normalizeEmail(item.email) === normalizedEmail && item.password === password);

  if (!account) {
    return {
      success: false,
      message: "E-mail ou senha inválidos.",
    };
  }

  persistSession(account.email);

  return {
    success: true,
    account,
  };
}

export function registerMockAccount({ fullName, email, password }: RegisterPayload): AuthResult {
  const normalizedEmail = normalizeEmail(email);
  const accounts = getStoredAccounts();
  const existingAccount = accounts.find((item) => normalizeEmail(item.email) === normalizedEmail);

  if (existingAccount) {
    return {
      success: false,
      message: "Já existe uma conta cadastrada com este e-mail.",
    };
  }

  const account: MockAccount = {
    id: `mock-${Date.now()}`,
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  saveAccounts([...accounts, account]);
  persistSession(account.email);

  return {
    success: true,
    account,
  };
}

export function getCurrentSessionAccount() {
  if (!isBrowser()) {
    return null;
  }

  const cookieEntry = document.cookie.split("; ").find((item) => item.startsWith(`${AUTH_COOKIE_NAME}=`));

  const sessionEmail = cookieEntry?.split("=")[1];

  if (!sessionEmail) {
    return null;
  }

  const decodedEmail = decodeURIComponent(sessionEmail);

  return (
    getStoredAccounts().find((item) => normalizeEmail(item.email) === normalizeEmail(decodedEmail)) ?? DEFAULT_ACCOUNT
  );
}

export function logoutMockAccount() {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}
